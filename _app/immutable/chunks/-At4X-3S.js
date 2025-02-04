import"./Bg9kRutz.js";import"./69_IOA4Y.js";import{o as v,w as h,Q as c,q as y,x as u,aq as G,aA as S,az as k,U as O,ak as w,v as H,e as R,i as _,y as x}from"./MXBhX1f8.js";import{g as f,o as C,a as T,t as j}from"./FVXy9n7x.js";function g(e,r,i,o,l){var s=e,a="",d;v(()=>{if(a===(a=r()??"")){h&&c();return}d!==void 0&&(H(d),d=void 0),a!==""&&(d=y(()=>{if(h){u.data;for(var t=c(),n=t;t!==null&&(t.nodeType!==8||t.data!=="");)n=t,t=G(t);if(t===null)throw S(),k;f(u,n),s=O(t);return}var m=a+"",p=C(m);f(w(p),p.lastChild),s.before(p)}))})}const b={title:"Git / GitHub について"},{title:q}=b;var z=j(`<h1></h1> <p>Git はバージョン管理システムの一つで、GitHub は Git を利用したプロジェクトのホスティングサービスです。</p> <p>おそらく、これを読む多くの方は、 Git といわれてもピンとこないと思いますので、まずは Git について簡単に説明します。</p> <h2>Git とは</h2> <p>Git は、ファイルの変更履歴を記録してくれるバージョン管理ツールです。ファイルの変更履歴を記録しておくことで、過去の状態に戻したり、複数人での開発時に競合したお互いの変更を取り込んだりすることが容易になります。</p> <p>Git は、ファイルの変更履歴を記録するための「リポジトリ」という単位で管理されます。私達は、リポジトリに対して下記のような操作を行います。</p> <table><thead><tr><th>操作</th><th>内容</th></tr></thead><tbody><tr><td>init</td><td>リポジトリを初期化する</td></tr><tr><td>clone</td><td>リポジトリを複製する</td></tr><tr><td>add</td><td>ファイルをステージングエリアに追加する</td></tr><tr><td>commit</td><td>ステージングエリアに追加されたファイルをリポジトリに記録する</td></tr><tr><td>push</td><td>ローカルリポジトリの変更をリモートリポジトリに反映する</td></tr><tr><td>pull</td><td>リモートリポジトリの変更をローカルリポジトリに反映する</td></tr><tr><td>branch</td><td>リポジトリの履歴を分岐させる</td></tr><tr><td>merge</td><td>リポジトリの履歴を統合する</td></tr><tr><td>rebase</td><td>リポジトリの履歴を整理する</td></tr><tr><td>tag</td><td>リポジトリの特定のコミットに名前をつける</td></tr><tr><td>log</td><td>リポジトリの履歴を表示する</td></tr></tbody></table> <p>これらの操作を使いこなすことで、 Git を効率的に利用することができます。</p> <p>ここまで読み終えた方々は、おそらく「専門用語」が多すぎると感じたことかと思います。用語集を別ページに作成しましたので、ホバーしたりクリックしたりして、用語の意味を確認してみてください。</p> <h3>バージョン管理について</h3> <p>では、なぜバージョン管理を行う必要があるのでしょうか。一般的には、主に下の三つが挙げられます。</p> <ul><li>プログラミングにおいて「以前に書いたコード」「コードの編集履歴」が重要であるから</li> <li>同じプロジェクトを共同で同時に開発することができるから</li> <li>本来のプログラミングは開かれた OSS であるべきだから</li></ul> <p>それぞ詳しく見ていきましょう。</p> <hr> <ul><li><strong>プログラミングにおいて「以前に書いたコード」「コードの編集履歴」が重要であるから</strong></li></ul> <p>たとえば下記のようなコードがあったとします。</p> <!> <p>これを下記のように編集します。</p> <!> <p>このとき、バグを修正して正常に動作するようにするのも一つの手ですが、場合によっては以前のコードに戻した方が良い時があります。</p> <p>しかし、多くの場合戻るボタンではかぎりがありますし、たとえば一度エディタを閉じてしまうともう元には戻りません。</p> <p>こうした時に、バージョン管理システムを使うと、正常に動作するコードであったタイミングまで元に戻すことができます。</p> <hr> <ul><li><strong>同じプロジェクトを共同で同時に開発することができるから</strong></li></ul> <p>複数人でプロジェクトを開発する場合、同時であってもなくても、お互いの編集を自身のファイルに適応させなければいけません。</p> <p>この時、たとえば自分の編集箇所を相手に伝える等、やり方はいくらでもありますが、ヒューマンエラーが起きるためあまりにも非合理的です。
また、同じ箇所を編集していた場合、どっちのコードをどうするか、その結果を相手にも反映させなければいけないなど不必要な工程が増えてしまいます。</p> <p>Git などのバージョン管理システムであれば、お互いの編集が更新をかければ常に最新の状態になりますし、競合した編集も適切に修正することができます。</p> <hr> <ul><li><strong>本来のプログラミングは開かれた OSS であるべきだから</strong></li></ul> <p>OSS とは、Open Source Software（オープンソースソフトウェア）の略で、ソースコードが公開されているソフトウェアのことを指します。</p> <p>もちろん、技術的な関係で非公開にする場合もありますが、 VSCode や firefox など、オープンソースであることには理由があります。</p> <p>ソースコードが公開されているということは、どのような仕組みでどこがどう動いているのかということがわかるということです。これは、ソフトウェアの透明性に繋がりますし、バグやエラーが起きればその原因を自分で探すことができます。
また、もしバグやエラーなどへの修正・改善を行えば、それを開発元に提出することで実際に適応してもらえることもあります。</p> <p>Git / GitHub では、他者の作成したリポジトリを閲覧・編集することができます。
こうしたプログラマ同士でお互いに議論し合い、助け合い、高め合うことのできる点もまたバージョン管理システムを使うメリットの一つであると言えます。</p> <hr>`,1);function A(e){var r=z(),i=R(r);i.textContent=q;var o=_(i,32);g(o,()=>'<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span># めちゃくちゃすごくて天才的なコード</span></span></code></pre>');var l=_(o,4);g(l,()=>'<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span># めちゃくちゃすごくて天才的だけどバグがあるコード</span></span></code></pre>'),x(30),T(e,r)}const N=Object.freeze(Object.defineProperty({__proto__:null,default:A,metadata:b},Symbol.toStringTag,{value:"Module"}));export{N as _};
