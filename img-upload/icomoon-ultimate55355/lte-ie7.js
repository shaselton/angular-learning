/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon-ultimate\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-confused' : '&#xe000;',
			'icon-grin' : '&#xe001;',
			'icon-cool' : '&#xe002;',
			'icon-evil' : '&#xe003;',
			'icon-tongue' : '&#xe004;',
			'icon-user' : '&#xe005;',
			'icon-folder-plus' : '&#xe007;',
			'icon-folder' : '&#xe006;',
			'icon-location' : '&#xe008;',
			'icon-location-2' : '&#xe009;',
			'icon-location-3' : '&#xe00a;',
			'icon-location-4' : '&#xe00b;',
			'icon-quill' : '&#xe00c;',
			'icon-quill-2' : '&#xe00d;',
			'icon-quill-3' : '&#xe00e;',
			'icon-images' : '&#xe00f;',
			'icon-camera' : '&#xe010;',
			'icon-folder-open' : '&#xe011;',
			'icon-folder-minus' : '&#xe012;',
			'icon-envelop' : '&#xe013;',
			'icon-calendar' : '&#xe014;',
			'icon-user-plus' : '&#xe015;',
			'icon-user-plus-2' : '&#xe016;',
			'icon-search' : '&#xe018;',
			'icon-cog' : '&#xe019;',
			'icon-cube' : '&#xe017;',
			'icon-close' : '&#xe01a;',
			'icon-resize' : '&#xe01b;',
			'icon-question' : '&#xe01c;',
			'icon-plus-circle' : '&#xe01d;',
			'icon-minus-circle' : '&#xe01e;',
			'icon-play' : '&#xe01f;',
			'icon-stop' : '&#xe020;',
			'icon-circle' : '&#xe021;',
			'icon-paragraph-justify' : '&#xe022;',
			'icon-google-plus' : '&#xe023;',
			'icon-facebook' : '&#xe024;',
			'icon-twitter' : '&#xe025;',
			'icon-feed' : '&#xe026;',
			'icon-github' : '&#xe027;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};