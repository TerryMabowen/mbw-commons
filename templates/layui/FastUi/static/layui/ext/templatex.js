layui.define(["jquery"], function(exports) {
  
    function Template(tpl) {
      var fn, 
          match, 
          code = ['var r=[];'],
          re = /\{\s*([a-zA-Z\.\_0-9()]+)\s*\}/m,
          addLine = function(text) {
            code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
          };
      
      while (match = re.exec(tpl)) {        
        if(match.index > 0) {
          addLine(tpl.slice(0, match.index));
        }
        code.push('r.push(this.' + match[1] + ');');
        tpl = tpl.substring(match.index + match[0].length);
      }
      
      addLine(tpl);
      
      code.push('return r.join(\'\');');
      
      fn = new Function(code.join('\n'));
      
      this.render = function(model) {
        return fn.apply(model);
      }
    };
        
	exports('templatex', { render: function(tpl, model) {
		var template = new Template(tpl);
		return template.render(model);}
	});
 });