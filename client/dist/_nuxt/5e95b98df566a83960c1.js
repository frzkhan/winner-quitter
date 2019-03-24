(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{365:function(e,t,r){"use strict";r.r(t);r(171),r(69);var n=r(14),o={middleware:"axios",data:function(){return{projects:[],project:{name:null,description:null,totalprize:null,duration:null,skills:null}}},asyncData:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/api/Tasks?filter[order]=created DESC&filter[include]=submissions");case 2:return r=(r=e.sent).map(function(p){return p.hasSelected=!!p.submissions.find(function(s){return s.selected}),p.currentApplied=!!p.submissions.find(function(s){return s.userId==t.store.state.user.id}),p}),e.abrupt("return",{projects:r});case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),methods:{saveProject:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$axios.$post("/api/Tasks",this.project);case 3:t=e.sent,this.project={name:null,description:null,totalprize:null,duration:null,skills:null},this.projects.unshift(t),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),alert("Couldnt add project, error occured"),console.error(e.t0);case 12:case"end":return e.stop()}},e,this,[[0,8]])}));return function(){return e.apply(this,arguments)}}(),apply:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$axios.$post("/api/Submissions",{userId:this.$store.state.user.id,taskId:t});case 3:e.sent,alert("Applied to this task"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0),alert("Application failed");case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t){return e.apply(this,arguments)}}()}},c=r(32),component=Object(c.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"container"},[r("h2",[e._v("Projects")]),e._v(" "),"client"==e.$store.state.user.realm?r("b-form",{staticClass:"col-6",on:{submit:function(t){return t.preventDefault(),e.saveProject(t)}}},[r("b-form-input",{attrs:{type:"text",required:"",placeholder:"Project title"},model:{value:e.project.name,callback:function(t){e.$set(e.project,"name",t)},expression:"project.name"}}),e._v(" "),r("b-form-textarea",{attrs:{placeholder:"Desription",rows:"3","max-rows":"6"},model:{value:e.project.description,callback:function(t){e.$set(e.project,"description",t)},expression:"project.description"}}),e._v(" "),r("b-form-input",{attrs:{type:"text",required:"",placeholder:"Add skills comma separated"},model:{value:e.project.skills,callback:function(t){e.$set(e.project,"skills",t)},expression:"project.skills"}}),e._v(" "),r("b-form-input",{attrs:{type:"number",required:"",placeholder:"Project Total prize"},model:{value:e.project.totalprize,callback:function(t){e.$set(e.project,"totalprize",t)},expression:"project.totalprize"}}),e._v(" "),r("b-form-input",{attrs:{type:"number",required:"",placeholder:"Project Duration"},model:{value:e.project.duration,callback:function(t){e.$set(e.project,"duration",t)},expression:"project.duration"}}),e._v(" "),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit",name:"button"}},[e._v("Add Project")])],1):e._e(),e._v(" "),r("b-list-group",{staticClass:"mt-5"},e._l(e.projects,function(t){return r("b-list-group-item",{key:t.id},[r("h4",[r("nuxt-link",{attrs:{to:"project/"+t.id}},[e._v("\n        "+e._s(t.name)+"\n      ")])],1),e._v(" "),r("p",[r("small",[e._v(e._s(t.created))])]),e._v(" "),r("p",[e._v(e._s(t.description))]),e._v(" "),r("p",[r("small",[e._v(" Skills requried: "+e._s(t.skills||"none"))])]),e._v(" "),r("p",[r("small",[e._v("Total Prize: "+e._s(t.totalprize))]),e._v(" | "),r("small",[e._v("Duration: "+e._s(t.duration)+" days")])]),e._v(" "),"worker"==e.$store.state.user.realm?r("div",[t.hasSelected||t.currentApplied?e._e():r("button",{attrs:{type:"button",name:"button"},on:{click:function(r){return e.apply(t.id)}}},[e._v("Apply")]),e._v(" "),t.hasSelected?r("span",{staticClass:"badge badge-danger"},[e._v("Candidate has been selected for this task")]):e._e(),e._v(" "),t.currentApplied?r("span",{staticClass:"badge badge-primary"},[e._v("You have applied to this project")]):e._e()]):e._e()])}),1)],1)},[],!1,null,null,null);t.default=component.exports}}]);