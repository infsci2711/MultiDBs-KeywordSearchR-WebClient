var restBaseUrl = "http://52.1.107.126:7654/"; //aws ip

function PersonViewModel(term, databaseName, tableName) {
	var self = this;
	
	self.term = ko.observable(term);
	self.databaseName = ko.observable(databaseName);
	self.tableName = ko.observable(tableName);

}


function PersonsViewModel() {
	
	var self = this;
	//var termsearch = ko.observable('');

	self.people = ko.observableArray();

	self.newPerson = ko.observable(new PersonViewModel());


	self.currentValue=ko.observable();
    

	self.findAll = function(form) {
		var q = document.getElementById('key').value;
		$.ajax({
			url: restBaseUrl + "Person/"+q,
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.removeAll();

				for (var i = 0; i < data.length; i++) {
					var person = new PersonViewModel(data[i].term, data[i].databaseName, data[i].tableName);
                   
					self.people.push(person);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting persons list. Please try again.");
			}
		});
	};

	self.findById = function() {
		$.ajax({
			url: restBaseUrl + "Person/",
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.removeAll();

				for (var i = 0; i < data.length; i++) {
					var person = new PersonViewModel(data[i].term, data[i].databaseName, data[i].tableName);
                   
					self.people.push(person);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting persons list. Please try again.");
			}
		});
	};

<<<<<<< HEAD
    
=======
	self.findById = function() {
		$.ajax({
			url: restBaseUrl + "Person/",
			type: 'GET',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.removeAll();
>>>>>>> origin/master

				for (var i = 0; i < data.length; i++) {
					var person = new PersonViewModel(data[i].term, data[i].databaseName, data[i].tableName);
                   
					self.people.push(person);
				}
			},
			error: function(data) {
				alert("Something went wrong while getting persons list. Please try again.");
			}
		});
	};


	self.addPerson = function() {
		$.ajax({
			url: restBaseUrl + "Person",
			type: 'PUT',
			data: ko.toJSON(self.newPerson()),
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			success: function(data) {
				self.people.push(new PersonViewModel(data.term, data.databaseName, data.tableName));
				self.newPerson(new PersonViewModel());
			},
			error: function(data) {
				alert("Something went wrong while adding new person. Please try again.");
			}
		});
	};

	//self.findAll();
}



ko.applyBindings(new PersonsViewModel(), $("#personsContainer")[0]);
