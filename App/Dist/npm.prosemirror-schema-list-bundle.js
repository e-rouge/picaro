(self.webpackChunkjavascript_development_environment=self.webpackChunkjavascript_development_environment||[]).push([[551],{4465:(e,t,n)=>{"use strict";n.d(t,{IB:()=>p,bw:()=>a,KI:()=>d});var r=n(1081),o=n(3263);function d(e,t){return function(n,d){var p=n.selection,a=p.$from,i=p.$to,l=a.blockRange(i),c=!1,s=l;if(!l)return!1;if(l.depth>=2&&a.node(l.depth-1).type.compatibleContent(e)&&0==l.startIndex){if(0==a.index(l.depth-1))return!1;var f=n.doc.resolve(l.start-2);s=new o.Ts(f,f,l.depth),l.endIndex<l.parent.childCount&&(l=new o.Ts(a,n.doc.resolve(i.end(l.depth)),l.depth)),c=!0}var u=(0,r.nd)(s,e,t,l);return!!u&&(d&&d(function(e,t,n,d,p){for(var a=o.HY.empty,i=n.length-1;i>=0;i--)a=o.HY.from(n[i].type.create(n[i].attrs,a));e.step(new r.FC(t.start-(d?2:0),t.end,t.start,t.end,new o.p2(a,0,0),n.length,!0));for(var l=0,c=0;c<n.length;c++)n[c].type==p&&(l=c+1);for(var s=n.length-l,f=t.start+n.length-(d?2:0),u=t.parent,h=t.startIndex,v=t.endIndex,m=!0;h<v;h++,m=!1)!m&&(0,r.Ax)(e.doc,f,s)&&(e.split(f,s),f+=2*s),f+=u.child(h).nodeSize;return e}(n.tr,l,u,c,e).scrollIntoView()),!0)}}function p(e){return function(t,n){var d=t.selection,p=d.$from,a=d.$to,i=p.blockRange(a,(function(t){return t.childCount&&t.firstChild.type==e}));return!!i&&(!n||(p.node(i.depth-1).type==e?function(e,t,n,d){var p=e.tr,a=d.end,i=d.$to.end(d.depth);return a<i&&(p.step(new r.FC(a-1,i,a,i,new o.p2(o.HY.from(n.create(null,d.parent.copy())),1,0),1,!0)),d=new o.Ts(p.doc.resolve(d.$from.pos),p.doc.resolve(i),d.depth)),t(p.lift(d,(0,r.k9)(d)).scrollIntoView()),!0}(t,n,e,i):function(e,t,n){for(var d=e.tr,p=n.parent,a=n.end,i=n.endIndex-1,l=n.startIndex;i>l;i--)a-=p.child(i).nodeSize,d.delete(a-1,a+1);var c=d.doc.resolve(n.start),s=c.nodeAfter;if(d.mapping.map(n.end)!=n.start+c.nodeAfter.nodeSize)return!1;var f=0==n.startIndex,u=n.endIndex==p.childCount,h=c.node(-1),v=c.index(-1);if(!h.canReplace(v+(f?0:1),v+1,s.content.append(u?o.HY.empty:o.HY.from(p))))return!1;var m=c.pos,y=m+s.nodeSize;return d.step(new r.FC(m-(f?1:0),y+(u?1:0),m+1,y-1,new o.p2((f?o.HY.empty:o.HY.from(p.copy(o.HY.empty))).append(u?o.HY.empty:o.HY.from(p.copy(o.HY.empty))),f?0:1,u?0:1),f?0:1)),t(d.scrollIntoView()),!0}(t,n,i)))}}function a(e){return function(t,n){var d=t.selection,p=d.$from,a=d.$to,i=p.blockRange(a,(function(t){return t.childCount&&t.firstChild.type==e}));if(!i)return!1;var l=i.startIndex;if(0==l)return!1;var c=i.parent,s=c.child(l-1);if(s.type!=e)return!1;if(n){var f=s.lastChild&&s.lastChild.type==c.type,u=o.HY.from(f?e.create():null),h=new o.p2(o.HY.from(e.create(null,o.HY.from(c.type.create(null,u)))),f?3:1,0),v=i.start,m=i.end;n(t.tr.step(new r.FC(v-(f?3:1),m,v,m,h,1,!0)).scrollIntoView())}return!0}}}}]);