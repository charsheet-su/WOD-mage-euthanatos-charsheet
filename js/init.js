// To be able to pass an array of promises
if (jQuery.when.all === undefined) {
    jQuery.when.all = function (deferreds) {
        var deferred = new jQuery.Deferred();
        $.when.apply(jQuery, deferreds).then(
            function () {
                deferred.resolve(Array.prototype.slice.call(arguments));
            },
            function () {
                deferred.fail(Array.prototype.slice.call(arguments));
            });

        return deferred;
    }
}

function create_attr(main_container, val, el_class) {
    el_class = el_class || 'attr';
    //name near the select
    if (val != undefined && val != '') {
        var div1 = $('<div>' + val + '</div>');
        div1.attr('class', el_class);
        main_container.append(div1);
    }
    var select = $('<select><option value=""></option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>');
    var div2 = $('<div></div>');
    div2.attr('class', el_class + '_value');
    div2.append(select);

    div2.find('select').barrating('show', {
        wrapperClass: 'br-wrapper-f',
        showSelectedRating: false
    });
    main_container.append(div2);
}

function set_data(list, el_class, main_container) {
    var data = {};
    //function get_data(deferred, path) {
    //}
    var deferreds = [];
    $.each(list, function (i, path) {
        var deferred = new $.Deferred();
        deferreds.push(deferred);
        //get_data(deferred, item);

        var jqxhr = $.get("get/" + path)
            .success(function (res) {
                data[path] = res;
            })
            .error(function () {
                alert("Error getting " + path + "!");
            })
            .complete(function () {
                deferred.resolve();
            });
    });
    $.when.all(deferreds).then(function () {
        $.each(data[list[0]], function (i) {//only take item index. could be a simple loop
            $.each(list, function (index, arr) {
                var item = data[arr][i];
                //var id = item.replace(/ /g, '_');
                $(main_container).append(create_attr($(main_container), item, el_class));
            });
        })
    })
}


$(document).ready(function () {
    load_all();
});

function load_numina() {
    var sp = $('<span>None</span>');
    sp.attr('data-title', 'Select numina');
    sp.attr('data-type', 'select');
    sp.attr('data-pk', '1');
    sp.attr('data-value', '5');
    sp.attr('data-source', 'get/advantages/numina.json');
    var div = $('<div></div>');
    div.attr('class', 'numina_name');
    div.append(sp);
    for (i = 0; i < 6; i++) {
        var div2 = div.clone();
        div2.editable({
            selector: 'span',
            url: '/post',
            pk: 1
        });
        $('.numina').append(div2);
        create_attr($('.numina'), '', 'numina');
    }
}

function load_backgrounds() {
    var sp = $('<span>None</span>');
    sp.attr('data-title', 'Select background');
    sp.attr('data-type', 'select');
    sp.attr('data-pk', '1');
    sp.attr('data-value', '5');
    sp.attr('data-source', 'get/advantages/backgrounds.json');
    sp.editable({
        selector: 'span',
        url: '/post',
        pk: 1
    });

    var div = $('<div></div>');
    div.attr('class', 'background_name');
    div.append(sp);
    for (i = 0; i < 6; i++) {
        var div2 = div.clone();
        div2.editable({
            selector: 'span',
            url: '/post',
            pk: 1
        });
        $('.backgrounds').append(div2);
        create_attr($('.backgrounds'), '', 'background');
    }
}

function set_traits(secondary) {
    var sp = $('<span>None</span>');
    sp.attr('data-title', 'Select trait');
    sp.attr('data-type', 'select');
    sp.attr('data-pk', '1');
    sp.attr('data-value', '5');
    //console.log(secondary);
    //console.log(secondary.toString());
    //sp.attr('source', secondary);
    var div = $('<div></div>');
    div.attr('class', 'trait_name');
    div.append(sp);
    for (i = 0; i < 12; i++) {
        var div2 = div.clone();
        div2.editable({
            prepend: "None",
            selector: 'span',
            url: '/post',
            source: secondary
        });
        $('.other_traits').append(div2);
        create_attr($('.other_traits'), '', 'trait');
    }
}
function load_traits() {
    var list = ['secondary/talents.json', 'secondary/skills.json', 'secondary/knowledges.json'];
    var data = {};
    //function get_data(deferred, path) {
    //}
    var deferreds = [];
    $.each(list, function (i, path) {
        var deferred = new $.Deferred();
        deferreds.push(deferred);
        //get_data(deferred, item);

        var jqxhr = $.get("get/" + path)
            .success(function (res) {
                data[path] = res;
            })
            .error(function () {
                alert("Error getting " + path + "!");
            })
            .complete(function () {
                deferred.resolve();
            });
    });
    $.when.all(deferreds).then(function () {
        var res = [];
        var z = 1;
        $.each(list, function (index, arr) {
            res.push({text: '---'});
            $.each(data[list[index]], function (i) { //only take item index. could be a simple loop
                var item = data[arr][i];
                res.push({text: item, value: z})
                z++;
                //console.log(item);
            });
        });
        return res;
    }).then(function (res) {
        //console.log(res);
        //return res;
        set_traits(res);
    })

}
function load_all() {

    //set abilities
    set_data(['abilities/talents.json', 'abilities/skills.json', 'abilities/knowledges.json'], 'abl', '.abilities');
    //set attributes
    set_data(['attributes/physical.json', 'attributes/social.json', 'attributes/mental.json'], 'attr', '.attributes');
    //set virtues
    set_data(['advantages/virtues.json'], 'virtue', '.virtues');

    load_numina();
    load_backgrounds();
    load_traits();

    $('#Humanity').barrating('show', {
        wrapperClass: 'br-wrapper-f',
        showSelectedRating: false
    });


    $('#Willpower').barrating('show', {
        wrapperClass: 'br-wrapper-f',
        showSelectedRating: false
    });

    $('#Willpower_current').barrating('show', {
        wrapperClass: 'br-wrapper-f2',
        showSelectedRating: false
    });

    /*var IDs = $(".health-table span[id]")         // find spans with ID attribute
     .map(function() { this.editable({
     //prepend: "□",
     source: [
     {value: 1, text: '□'},
     {value: 2, text: '/'},
     {value: 3, text: 'X'},
     {value: 4, text: '*'}
     ]
     }); }) // convert to set of IDs*/


}

/*
 function reloadEditable() {
 //apply editable to parent div
 $('.backgrounds').editable({
 selector: 'span',
 url: '/post',
 pk: 1
 });

 //apply editable to parent div
 $('.numina').editable({
 selector: 'span',
 url: '/post',
 pk: 1
 });
 }*/
