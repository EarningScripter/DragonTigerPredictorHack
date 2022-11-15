$(document).ready(function() {
	function convert_value_to_string(value) {	
		switch (value) {
			case 1:
			return 'ace';
			case 11:
			return 'jack';
			break;
			case 12:
			return 'queen';
			break;
			case 13:
			return 'king';
			break;
		}	
		return value.toString();
	}
	function getFileName(card){
		var fileName = "./PNG-cards/" + convert_value_to_string(card.number) + "_of_" + card.suit + ".png";
		return fileName;
	}
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}	
	deck = _.shuffle(deck);	
	var cards_player_1 = [];
	var cards_player_2 = [];
	cards_player_1 = (deck.splice(0,26));
	cards_player_2 = (deck);
	
	function war(card1, card2) {
		if(card1.number > card2.number){
			return card1;
		}else if(card2.number > card1.number){
			return card2;
		}else{
			return false;
		}
	}
	function unload(array){
		while(pending.length > 0){
			array.push(pending.pop());
		}
	}
	function updateCards(warResult,lastPendingIndex){
		if(warResult === pending[lastPendingIndex-1] ){
			$("#message").html('Dragon won the last round. ' + pending.length 
				+ ' cards were sent to the bottom of his/her deck.');
			unload(cards_player_1);	
		}else if(warResult === pending[lastPendingIndex]){
			$("#message").html('Tiger the last round. ' + pending.length 
				+ ' cards were sent to the bottom of your deck.');
			unload(cards_player_2);
		}else{
			$("#message").html('Last round was a tie. Comparing the next set of cards.')
			advance();
		}
	}
	function play() {
		var card_1 = cards_player_1[0];
		var card_2 = cards_player_2[0];
		pending.push(card_1, card_2);
		cards_player_2 = _.without(cards_player_2,card_2);
		cards_player_1 = _.without(cards_player_1,card_1);
		var l = pending.length-1;
		var result = war(pending[l-1],pending[l]);
		updateCards(result, l);
		advance();
	}
	function advance() {
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card-count").html(cards_player_2.length);
			$("#opp-card").html('<img src="' + getFileName(card_1) + '"/>');
			$("#my-card").html('<img src="' + getFileName(card_2) + '"/>');	
		}
	}
	advance();
	var pending = [];
	$(".btn").click(function() {
		play();
	});
});