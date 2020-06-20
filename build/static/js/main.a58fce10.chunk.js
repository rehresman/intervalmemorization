(this.webpackJsonpmusicstudy=this.webpackJsonpmusicstudy||[]).push([[0],{15:function(e,t,n){},18:function(e,t,n){e.exports=n(30)},29:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(10),i=n.n(s),o=n(3),l=n(8),c=(n(29),n(4)),u=n(5),h=n(1),m=n(6),p=n(7),v=n(2);function b(e,t,n){return{type:"UPDATE_PROBABILITY",payload:{note:e,interval:t,probability:n}}}function d(e,t){return t-e.flashcardShownTime}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return(t+e.sumResponseTime)/(e.numResponses+n)}function y(e,t){return Math.pow(t-e.sampleMean,2)}function O(e,t){var n=e.numResponses>1?(e.sumTestVariance+t)/e.numResponses:625e4;return n>=Number.MAX_VALUE&&alert("Variance overflow.  Need to fix this"),n}function g(e,t){return Math.pow(e,2)/t}function w(e,t){return e/t}var j=n(17),N=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={note:null,interval:null,answer:null,showAnswer:!1},e.chooseNext=e.chooseNext.bind(Object(h.a)(e)),e.getNewProbability=e.getNewProbability.bind(Object(h.a)(e)),e.getRandomNote=e.getRandomNote.bind(Object(h.a)(e)),e.getRandomInterval=e.getRandomInterval.bind(Object(h.a)(e)),e.getAnswer=e.getAnswer.bind(Object(h.a)(e)),e.handleClick=e.handleClick.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"chooseNext",value:function(){var e=Math.floor(12*Math.random()),t=Math.floor(11*Math.random())+1,n=this.props.notes[e].intervals[t];return Math.random()>n.probability?this.chooseNext():{note:this.props.notes[e],interval:this.props.notes[e].intervals[t]}}},{key:"componentDidMount",value:function(){this.setState(this.chooseNext())}},{key:"componentDidUpdate",value:function(e,t){t.note===this.state.note&&t.interval===this.state.interval||this.setState(this.getAnswer),this.state.note!==t.note&&console.log(this.props)}},{key:"getNewProbability",value:function(e,t){var n=d(e,t),a=j.jStat.gamma.cdf(n,e.alpha,1/e.beta),r=this.state.interval.probability;return r+(1-r)*(a-.5)}},{key:"getRandomNote",value:function(){return this.props.notes[0]}},{key:"getRandomInterval",value:function(){return this.props.notes[0].intervals[1]}},{key:"getAnswer",value:function(e){var t=(e.note.number+e.interval.size)%Object.entries(this.props.notes).length,n=Object(v.a)({},this.props.notes[t]);return Object(v.a)({},e,{answer:n})}},{key:"handleClick",value:function(){var e=(new Date).getTime();if(this.state.showAnswer)this.props.dispatch(function(e){return{type:"UPDATE_FLASHCARD_SHOWN_TIME",payload:e}}(e)),this.setState(Object(v.a)({},this.chooseNext(),{showAnswer:!1}));else{if(this.props.stats.flashcardShownTime){var t=this.getNewProbability(this.props.stats,e);this.props.dispatch(function(e,t,n){return{type:"SAVE_PREVIOUS_PROBABILITY",payload:{note:e,interval:t,probability:n}}}(this.state.note,this.state.interval,this.state.interval.probability)),this.props.dispatch(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return console.log("here: ",{time:e,numResponses:t}),{type:"UPDATE_STATS",payload:{time:e,numResponses:t}}}(e)),this.props.dispatch(b(this.state.note,this.state.interval,t))}this.setState({showAnswer:!0})}}},{key:"render",value:function(){var e=this.state.note?this.state.note.name:null,t=this.state.interval?this.state.interval.name:null,n=this.state.answer?this.state.answer.name:null,a="answer hide",s="border",i="interval lightgray";return this.state.showAnswer&&(a="answer show",s="border bg-white text-dark",i="interval darkgray"),this.props.viewControls&&(s+=" hide"),r.a.createElement("div",{id:"flashcard",className:s,onClick:this.handleClick},r.a.createElement("section",{className:"note"},e),r.a.createElement("section",{className:i},t),r.a.createElement("section",{className:a},n))}}]),n}(r.a.Component);var k=Object(o.b)((function(e){return{notes:e.notes,viewControls:e.viewControls,stats:e.stats,history:e.history}}))(N),E=[{name:"C",number:0},{name:"Db",number:1},{name:"D",number:2},{name:"Eb",number:3},{name:"E",number:4},{name:"F",number:5},{name:"Gb",number:6},{name:"G",number:7},{name:"Ab",number:8},{name:"A",number:9},{name:"Bb",number:10},{name:"B",number:11}],C=[{name:"m2 \u2197",size:1},{name:"M2 \u2197",size:2},{name:"m3 \u2197",size:3},{name:"M3 \u2197",size:4},{name:"perf 4 \u2197",size:5},{name:"dim 5 \u2197",size:6},{name:"perf 5 \u2197",size:7},{name:"m6 \u2197",size:8},{name:"M6 \u2197",size:9},{name:"m7 \u2197",size:10},{name:"M7 \u2197",size:11}],A=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).buildChart=e.buildChart.bind(Object(h.a)(e)),e.getIntervalsForNote=e.getIntervalsForNote.bind(Object(h.a)(e)),e.getNewRow=e.getNewRow.bind(Object(h.a)(e)),e.getXAxis=e.getXAxis.bind(Object(h.a)(e)),e.getIntervalNames=e.getIntervalNames.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"buildChart",value:function(){console.log(this.props.notes);for(var e=[],t=0;t<E.length;t++)e.push(this.getNewRow(this.props.notes[t]));return e.push(this.getXAxis()),e}},{key:"getIntervalsForNote",value:function(e){var t=[],n=this.props.notes,a=Object.entries(n[e.number].intervals).map((function(e){return e[1]}));console.log();for(var s,i=0;i<a.length;i++)s=a[i],t.push(r.a.createElement("div",{style:{backgroundColor:T(100*(1-s.probability))},className:"h-100 w-100 p-0 plot-blob"},"~"));return t}},{key:"getIntervalNames",value:function(){for(var e=[],t=0;t<C.length;t++)e.push(r.a.createElement("small",null,r.a.createElement("b",null,C[t].name)));return e}},{key:"getNewRow",value:function(e){return r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("b",null,e.name,":")," ",this.getIntervalsForNote(e))}},{key:"getXAxis",value:function(){return r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("b",{className:"hide"},"X :")," ",this.getIntervalNames())}},{key:"render",value:function(){return r.a.createElement("div",{className:"text-dark container"},this.buildChart())}}]),n}(r.a.Component);function T(e){var t=function(e,t,n){var a,r,s;if(0===t)a=r=s=n;else{function i(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}var o=n<.5?n*(1+t):n+t-n*t,l=2*n-o;a=i(l,o,e+1/3),r=i(l,o,e),s=i(l,o,e-1/3)}return[Math.floor(255*a),Math.floor(255*r),Math.floor(255*s)]}(1.2*e/360,1,.5);return"rgb("+t[0]+","+t[1]+","+t[2]+")"}var I=Object(o.b)((function(e){return{notes:e.notes}}))(A),M=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).getIntervals=e.getIntervals.bind(Object(h.a)(e)),e.expandedView=e.expandedView.bind(Object(h.a)(e)),e.getNotes=e.getNotes.bind(Object(h.a)(e)),e.updateIntervalList=e.updateIntervalList.bind(Object(h.a)(e)),e.updateNoteList=e.updateNoteList.bind(Object(h.a)(e)),e.isActiveInterval=e.isActiveInterval.bind(Object(h.a)(e)),e.isActiveNote=e.isActiveNote.bind(Object(h.a)(e)),e.state={show:!1},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){return e.setState({show:!0})}),0)}},{key:"expandedView",value:function(){return r.a.createElement("div",{className:"position-relative"},r.a.createElement("small",{className:"expanded border",onClick:this.toggleView},"Hide Controls"),r.a.createElement("ul",{className:"mt-3"},this.getIntervals()))}},{key:"getIntervals",value:function(){for(var e,t=this,n=[],a=this.props.notes,s=Object.entries(a[0].intervals).map((function(e){return e[1]})),i=function(i,o){var l=(o=s[i]).name,c=t.isActiveInterval(o,a);n.push(r.a.createElement("li",{key:l},r.a.createElement("input",{type:"checkbox",defaultChecked:c,value:l,onClick:function(){return t.handleIntervalClick(o)}}),r.a.createElement("label",{htmlFor:l,className:"pl-1"},l))),e=o},o=0;o<s.length;o++)i(o,e);return n}},{key:"getNotes",value:function(){for(var e,t=this,n=[],a=Object.entries(this.props.notes).map((function(e){return e[1]})),s=function(s,i){var o=(i=a[s]).name,l=t.isActiveNote(i);n.push(r.a.createElement("li",{key:o},r.a.createElement("input",{type:"checkbox",defaultChecked:l,value:o,onClick:function(){return t.handleNoteClick(i)}}),r.a.createElement("label",{htmlFor:o,className:"pl-1"},o))),e=i},i=0;i<a.length;i++)s(i,e);return n}},{key:"handleIntervalClick",value:function(e){this.updateIntervalList(e)}},{key:"handleNoteClick",value:function(e){this.updateNoteList(e)}},{key:"isActiveInterval",value:function(e,t){for(var n=Object.entries(t).map((function(t){return t[1].intervals[e.size]})),a=0;a<n.length;a++)if(n[a].probability>0)return!0;return!1}},{key:"isActiveNote",value:function(e){for(var t=Object.entries(e.intervals).map((function(e){return e[1]})),n=0;n<t.length;n++)if(t[n].probability>0)return!0;return!1}},{key:"render",value:function(){var e;return e=this.state.show?"bg-light text-dark":"container",r.a.createElement("div",{className:"controls-view"},r.a.createElement("section",{id:"controls",className:e},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6"},r.a.createElement("b",{className:""},"Intervals"),r.a.createElement("ul",{className:"mt-3"},this.getIntervals())),r.a.createElement("div",{className:"col-6"},r.a.createElement("b",{className:""},"Notes"),r.a.createElement("ul",{className:"mt-3"},this.getNotes()))))),r.a.createElement(I,null))}},{key:"updateIntervalList",value:function(e){for(var t=this.props.notes,n=Object.entries(t).map((function(e){return e[1]})),a=this.isActiveInterval(e,t)?0:.5,r=0;r<n.length;r++)this.isActiveNote(n[r])&&this.props.dispatch(b(n[r],e,a))}},{key:"updateNoteList",value:function(e){for(var t=Object.entries(e.intervals).map((function(e){return e[1]})),n=this.isActiveNote(e)?0:.5,a=0;a<t.length;a++)this.isActiveInterval(t[a],this.props.notes)&&this.props.dispatch(b(e,t[a],n))}}]),n}(r.a.Component);var R=Object(o.b)((function(e){return{notes:e.notes,viewControls:e.viewControls}}))(M),S=(n(15),function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={oops:!1},e.handleOopsClick=e.handleOopsClick.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"handleOopsClick",value:function(){if(this.setState({oops:!0}),this.props.history.note){var e=this.props.history.probability+(1-this.props.history.probability)/2;this.props.dispatch(b(this.props.history.note,this.props.history.interval,e))}}},{key:"componentDidUpdate",value:function(e){e.history.note===this.props.history.note&&e.history.interval===this.props.history.interval&&e.history.probability===this.props.history.probability||this.setState({oops:!1})}},{key:"render",value:function(){var e=this.state.oops?"border tiny smooth":"border p-3 py-4 mr-4 mr-md-5 smooth ml-0",t=this.state.oops?"":"Oops?";return r.a.createElement("div",null,r.a.createElement("div",{className:e,onClick:this.handleOopsClick,id:"oops"},t),r.a.createElement("div",{className:"placeholder border p-3 mr-4 mr-md-5 hide"},"Oops?"))}}]),n}(r.a.Component));var x=Object(o.b)((function(e){return{history:e.history}}))(S),D=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={interval:null,color:"#fff"},e.changeColor=e.changeColor.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"changeColor",value:function(){var e,t=Math.floor(6*Math.random());switch(t===this.state.color&&(t=(t+1)%6),console.log("r=",t),t){case 0:e="#007bff";break;case 1:e="#28a745";break;case 2:e="#dc3545";break;case 3:e="#ffc107";break;case 4:e="#17A2BD";break;case 5:default:e="#fff"}this.setState({color:e})}},{key:"componentDidMount",value:function(){var e=this;this.setState({interval:setInterval((function(){return e.props.dispatch({type:"UPDATE_TIME",payload:(new Date).getTime()})}),100)}),this.props.dispatch({type:"START_TIME",payload:(new Date).getTime()})}},{key:"componentDidUpdate",value:function(e,t){var n=Math.round((this.props.time.currentTime-this.props.time.start)/1e3),a=Math.round((e.time.currentTime-e.time.start)/1e3);Math.floor(n/60)!==Math.floor(a/60)&&this.changeColor()}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.interval)}},{key:"render",value:function(){var e=Math.round((this.props.time.currentTime-this.props.time.start)/1e3),t=e%60,n=Math.floor(e/60),a=t<10?0:"";return r.a.createElement("time",{id:"timer",className:"border py-3"},r.a.createElement("code",{style:{color:this.state.color}},n,":",a,t))}}]),n}(r.a.Component);var _=Object(o.b)((function(e){return{notes:e.notes,viewControls:e.viewControls,time:e.time}}))(D),L=function(e){Object(p.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).show=e.show.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"show",value:function(){return this.props.viewControls?r.a.createElement(R,null):r.a.createElement("div",{className:"d-block"},r.a.createElement("div",{className:"d-flex align-items-center mb-4"},r.a.createElement(x,null),r.a.createElement(k,null)),r.a.createElement(_,null))}},{key:"render",value:function(){var e=this,t=this.props.viewControls?"Hide Controls":"Show Controls",n=this.props.viewControls?"App bg-light":"App";return r.a.createElement("div",{className:n},r.a.createElement("nav",{className:"text-left pt-3 container position-relative"},r.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.props.dispatch({type:"TOGGLE_CONTROLS"})}},t)),r.a.createElement("main",{className:"app-main"},this.show()))}}]),n}(r.a.Component);var P=Object(o.b)((function(e){return{viewControls:e.viewControls}}))(L),z=n(9),V=Object(l.b)({notes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_PROBABILITY":return Object(v.a)({},e,Object(z.a)({},t.payload.note.number,Object(v.a)({},e[t.payload.note.number],{intervals:Object(v.a)({},e[t.payload.note.number].intervals,Object(z.a)({},t.payload.interval.size,Object(v.a)({},t.payload.interval,{probability:t.payload.probability})))})));default:return Object(v.a)({},e)}},viewControls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_CONTROLS":return!e;default:return e}},time:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_TIME":return Object(v.a)({},e,{start:t.payload});case"UPDATE_TIME":return Object(v.a)({},e,{currentTime:t.payload});default:return Object(v.a)({},e)}},stats:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_FLASHCARD_SHOWN_TIME":return Object(v.a)({},e,{flashcardShownTime:t.payload});case"UPDATE_STATS":var n=d(e,t.payload.time),a=f(e,n),r=y(e,n),s=O(e,r);return Object(v.a)({},e,{start:e.start,responseTime:n,sumResponseTime:n+e.sumResponseTime,numResponses:e.numResponses+t.payload.numResponses,sampleMean:a,responseDeviation:r,sumTestVariance:e.sumTestVariance+r,sampleVariance:s,alpha:g(a,s),beta:w(a,s)});default:return Object(v.a)({},e)}},history:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_PREVIOUS_PROBABILITY":return Object(v.a)({},t.payload);default:return Object(v.a)({},e)}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=Object(l.c)(V,function(){for(var e={},t=0;t<E.length;t++){for(var n={},a=0;a<C.length;a++){var r=C[a];n[r.size]={name:r.name,size:r.size,probability:.5}}var s=E[t];e[s.number]={name:s.name,number:s.number,intervals:n}}return{notes:e,viewControls:!1,time:{start:null,currentTime:null},stats:{responseTime:null,sumResponseTime:0,numResponses:0,sampleMean:5e3,flashcardShownTime:null,testVariance:0,sumTestVariance:0,sampleVariance:625e4,alpha:4,beta:8e-4},history:{note:null,interval:null,probability:null}}}());i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,{store:U},r.a.createElement(P,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.a58fce10.chunk.js.map