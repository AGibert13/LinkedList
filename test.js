$(document).ready(function(){
	class Node {
	constructor(data = null, next = null){
		this.data = data;
		this.next = next;
	}

	getData(){
		return this.data;
	}

	getNext(){
		return this.next;
	}

	printData(msg){
		if ($("#message").length) {
			$("#message").append(", "+ msg)
		} 
		else {
			var message = "<p id=\"message\">" + msg + "<\p>";
			$("#listResult").append(message);
		}
	}
}

class LinkedList{
	constructor(head = null){
		this.head = head;
	}

	insert(data){
		var newNode = new Node(data);
		if(this.head){
			var head = this.head;
			var current = head;
			while (true){
				if (current.next){
					var previous = current;
					current = current.next;
				}
				else{
					break;
				}
			}
			current.next = newNode;
		}
		else{
			this.head = newNode;
		}
	}

	size(){
		var current = this.head;
		var count = 0;
		while (current){
			count++;
			current = current.getNext();
		}
		return count
	}

	search(data){
			var current = this.head;
			var index = null;
			var find = true;
			while (find){
				if (current.getData() == data) {
					find = false;

				}
				else{
					current = current.getNext()
				}
				index++;
			}
			if (current === null) {
				console.log("Value not in list.")
			}
			
			return index;
		}

	delete(index){
		var current = this.head;
		var previous = null;
		var find = true;
		while (find){
			if (this.search(current.data) == index) {
				find=false;

			}
			else{
				previous = current
				current = current.getNext();
			}
		}
		if (current === null) {
			console.log("Value not in list.");
		}
		if (previous === null){
			this.head = current.getNext();
		}
		else{
			previous.next = current.getNext()
		}
	}

	deleteAll(){
		var length = this.size();
		for (var j = 1; j <= length; j++) {
			this.delete(j);
		}
	}
	
	printAll(){
		var current = this.head;
		var print = true;
		if (current === null) {
			$('#listResult').append("<p>No data inserted.</p>");
		}
		else{
			if($("#message")){
				$('#listResult').empty();
			}
			while (print){
				current.printData(current.data);
				if(current.getNext()){
					current = current.getNext();
				}
				else{
					break;
				}
			}
		}
	}
}
	var list = new LinkedList();
	$('select').prop("selectedIndex","-1")
	$('header').animate({width: "140%"},1000);
	$('#body').fadeIn(1000);
	$('#insert').keyup(function(){
		var value = $(this).val();
		var listValue =$('#listResult').html();
		if (value || listValue) {
			$('select').removeAttr("disabled");
			$('#submit').removeAttr("disabled");
		}
		else{
			$('select').attr("disabled","true")
			$('#submit').attr("disabled","true")
		}
	});

	$('#submit').click(function(){
		var method = $('select').val();
		var value = $('#insert').val();
		if ($('#listResult').html()) {
			$('#listResult, #searchResult').empty();
		}
		if (method === "add") {
			list.insert(value);
		}
		else if(method === "search"){
			if ('#searchResult') {
				$(this).empty();
			}
			var searchIndex = list.search(value);
			$('#searchResult').append("<p>" + searchIndex +"</p>")
		}
		else if(method === "delete"){list.delete(value);
		}
		else if(method === "deleteAll"){
			list.deleteAll();
		}
		else{
			$('#listResult').append("<p>Please choose an option.</p>")
		}
		list.printAll();
	})
})



