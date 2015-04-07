//var restBaseUrl = "http://52.1.107.126:7654/"; //aws ip
var restBaseUrl = "http://localhost:7654/";

function PersonViewModel(term, databaseName, tableName, columnName) {
	var self = this;
	
	self.term = ko.observable(term);
	self.databaseName = ko.observable(databaseName);
	self.tableName = ko.observable(tableName);
	self.columnName = ko.observable(columnName);

}


function PersonsViewModel() {
	var self = this;
	//var termsearch = ko.observable('');

	self.people = ko.observableArray();

	self.newPerson = ko.observable(new PersonViewModel());

	self.findAll = function() {
		$.ajax({
			url: restBaseUrl + "Index",
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.removeAll();

				for (var i = 0; i < data.length; i++) {
					var person = new PersonViewModel(data[i].term, data[i].databaseName, data[i].tableName, data[i].columnName);
                   
					self.people.push(person);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting Index list. Please try again.");
			}
		});
	};

	self.findById = function() {
		var q = document.getElementById('key').value;
		var splited = q.split("+");
		$.ajax({
			url: restBaseUrl + "Index/"+q,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.removeAll();

				for (var i = 0; i < data.length; i++) {
					var person = new PersonViewModel(data[i].term, data[i].databaseName, data[i].tableName, data[i].columnName);
                   
					self.people.push(person);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting Index list. Please try again.");
			}
		});
	};


	self.addPerson = function() {
		$.ajax({
			url: restBaseUrl + "Index",
			type: 'PUT',
			data: ko.toJSON(self.newPerson()),
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.push(new PersonViewModel("test", "test", "test", "test"));
				//self.newPerson(new PersonViewModel());
			},
			error: function(data) {
				alert("Something went wrong while adding new person. Please try again.");
			}
		});
	};

	//self.findAll();
}

ko.applyBindings(new PersonsViewModel(), $("#personsContainer")[0]);
