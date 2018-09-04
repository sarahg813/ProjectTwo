$.ajax({
	url: '/content',
	method: 'GET'
}).then(function(data){

    	var p, img, ob, form, button, a;
	for (var i=0; i<data.length; i++){
		ob = data[i];
		p = $('<p>');
        p.text(ob.pet_name);
        img = $("<img>");
        img.attr("src", ob.img_url);
        $('#pet').append(p, img);


    }


	// var p, ob, necc, form, button, a;
	// for (var i=0; i<data.length; i++){
	// 	ob = data[i];
	// 	p = $('<p>');
	// 	p.text(ob.question);

	// 	form = $('<form>');
	// 	form.attr('method', 'POST');
	// 	form.attr('action', '/delete/' + ob.id + '?_method=DELETE');
	// 		button = $('<button>');
	// 		button.text('x');

	// 			form.append(button);

	// 	p.append(form);

	// 	a = $('<a>'); //<a></a>
	// 	a.text('edit'); //<a>edit</a>
	// 	a.attr('href', '/edit/' + ob.id);

	// 	p.append(a);
		
	// 	/*
	// 		<p>!*1
	// 			<form method="POST" action="/delete/4">
	// 				<button>x</button>
	// 			</form>
	// 		</p>
	// 	*/

	// 	$('body').append(p);
	})