 

import React from "react";
import{ toast } from "react-toastify";

const Docs=(props)=>{
  console.log({props,this:this})
let style={
    padding: '20px',
    margin: '20px 0',
    border: '1px solid #eee',
    borderRadius: '3px',
    borderLeftColor: '#1b809e'
}

return(

<div className='container'>


<div style={style}  className="alert alert-primary">
<span  className='fa fa-copy'
  style={{position:'absolute',color:'black',right:2,top:4}}
  
  onClick={e=>{
{/* copy link    */}
      let   copyText=document.getElementById('Link')
copyText.select();
document.execCommand('copy');
toast.success(<p >url copied</p>,{
    autoClose:'500s',
    position:'bottom-center',
    draggable:true,
})

     }}/> 
   <b>  

 from any device access this link and you will get device data in your profile</b>
     
     
     
     <textarea  id='Link'
     readOnly
     className="form-control" rows="3"  value={"http://"+window.location.host+'/'+props.id} >dddddd</textarea>

  </div>
  <div className="alert alert-primary m-0" role="alert">
 Arduino example
</div>
<div>

<pre style={{color:'white',backgroundColor:'#5f5f5f'}} className=" language-markup">
<div className="container"><div className="line number2 index1 alt1"><code className="cpp preprocessor">#include &lt;HTTPClient.h&gt;</code></div><div className="line number1 index0 alt2"><code className="cpp preprocessor">#include &lt;WiFi.h&gt;</code></div><div className="line number3 index2 alt2">&nbsp;</div><div className="line number4 index3 alt1"><code className="cpp keyword bold">const</code> <code className="cpp color1 bold">char</code><code className="cpp plain">* ssid = </code><code className="cpp string">"yourNetworkName"</code><code className="cpp plain">;</code></div><div className="line number5 index4 alt2"><code className="cpp keyword bold">const</code> <code className="cpp color1 bold">char</code><code className="cpp plain">* password =&nbsp; </code><code className="cpp string">"yourNetworkPassword"</code><code className="cpp plain">;</code></div><div className="line number6 index5 alt1">&nbsp;</div><div className="line number7 index6 alt2"><code className="cpp keyword bold">void</code> <code className="cpp plain">setup() &#123;</code></div><div className="line number8 index7 alt1">&nbsp;</div><div className="line number1 index0 alt2"><code className="cpp preprocessor">  &nbsp;&nbsp;   pinMode(2,HIGH)</code></div><div className="line number9 index8 alt2"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">Serial.begin(115200);</code></div><div className="line number10 index9 alt1"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">delay(4000);&nbsp;&nbsp; </code><code className="cpp comments">//Delay needed before calling the WiFi.begin</code></div><div className="line number11 index10 alt2">&nbsp;</div><div className="line number12 index11 alt1"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">WiFi.begin(ssid, password); </code></div><div className="line number13 index12 alt2">&nbsp;</div><div className="line number14 index13 alt1"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp keyword bold">while</code> <code className="cpp plain">(WiFi.status() != WL_CONNECTED) 125123; </code><code className="cpp comments">//Check for the connection</code></div><div className="line number15 index14 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">delay(1000);</code></div><div className="line number16 index15 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(</code><code className="cpp string">"Connecting to WiFi.."</code><code className="cpp plain">);</code></div><div className="line number17 index16 alt2"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">125125</code></div><div className="line number18 index17 alt1">&nbsp;</div><div className="line number19 index18 alt2"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(</code><code className="cpp string">"Connected to the WiFi network"</code><code className="cpp plain">);</code></div><div className="line number20 index19 alt1">&nbsp;</div><div className="line number21 index20 alt2"><code className="cpp plain">&#125;</code></div><div className="line number22 index21 alt1">&nbsp;</div><div className="line number23 index22 alt2"><code className="cpp keyword bold">void</code> <code className="cpp plain">loop() &#123;</code></div><div className="line number24 index23 alt1">&nbsp;</div><div className="line number25 index24 alt2"><code className="cpp spaces">&nbsp;</code><code className="cpp keyword bold">if</code><code className="cpp plain">(WiFi.status()== WL_CONNECTED)&#123;&nbsp;&nbsp; </code><code className="cpp comments">//Check WiFi connection status</code></div><div className="line number26 index25 alt1">&nbsp;</div><div className="line number27 index26 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">HTTPClient http;&nbsp;&nbsp; </code></div><div className="line number28 index27 alt1">&nbsp;</div><div className="line number29 index28 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">http.begin(</code><code className="cpp string">"<a href="http://jsonplaceholder.typicode.com/posts">{"http://"+window.location.host+'/'+props.id}</a>"</code><code className="cpp plain">);&nbsp; //Specify destination </code><code className="cpp keyword bold">for</code> <code className="cpp plain">HTTP request</code></div><div className="line number30 index29 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">http.addHeader(</code><code className="cpp string">"Content-Type"</code><code className="cpp plain">, </code><code className="cpp string">"text/plain"</code><code className="cpp plain">);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code className="cpp comments">//Specify content-type header</code></div><div className="line number31 index30 alt2">&nbsp;</div><div className="line number32 index31 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp color1 bold">int</code> <code className="cpp plain">httpResponseCode = http.POST(</code><code className="cpp string">"POSTING from ESP32"</code><code className="cpp plain">);&nbsp;&nbsp; </code><code className="cpp comments">//Send the actual POST request</code></div><div className="line number33 index32 alt2">&nbsp;</div><div className="line number34 index33 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp keyword bold">if</code><code className="cpp plain">(httpResponseCode&gt;0)&#123;</code></div><div className="line number35 index34 alt2">&nbsp;</div><div className="line number36 index35 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">String response = http.getString();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code className="cpp comments">//Get the response to the request</code></div><div className="line number37 index36 alt2">&nbsp;</div><div className="line number38 index37 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(httpResponseCode);&nbsp;&nbsp; </code><code className="cpp comments">//Print return code</code></div><div className="line number39 index38 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(response);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </code><code className="cpp comments">//Print request answer</code></div><div className="line number40 index39 alt1">&nbsp;</div><div className="line number41 index40 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">&#125;</code><code className="cpp keyword bold">else</code><code className="cpp plain">&#123;</code></div><div className="line number42 index41 alt1">&nbsp;</div><div className="line number43 index42 alt2"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.print(</code><code className="cpp string">"Error on sending POST: "</code><code className="cpp plain">);</code></div><div className="line number44 index43 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(httpResponseCode);</code></div><div className="line number45 index44 alt2">&nbsp;</div><div className="line number46 index45 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">&#125;</code></div><div className="line number47 index46 alt2">&nbsp;</div><div className="line number48 index47 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">http.end();&nbsp; </code><code className="cpp comments">//Free resources</code></div><div className="line number49 index48 alt2">&nbsp;</div><div className="line number50 index49 alt1"><code className="cpp spaces">&nbsp;</code><code className="cpp plain">&#125;</code><code className="cpp keyword bold">else</code><code className="cpp plain">&#123;</code></div><div className="line number51 index50 alt2">&nbsp;</div><div className="line number52 index51 alt1"><code className="cpp spaces">&nbsp;&nbsp;&nbsp;&nbsp;</code><code className="cpp plain">Serial.println(</code><code className="cpp string">"Error in WiFi connection"</code><code className="cpp plain">);&nbsp;&nbsp; </code></div><div className="line number53 index52 alt2">&nbsp;</div><div className="line number54 index53 alt1"><code className="cpp spaces">&nbsp;</code><code className="cpp plain">&#125;</code></div><div className="line number55 index54 alt2">&nbsp;</div><div className="line number56 index55 alt1"><code className="cpp spaces">&nbsp;&nbsp;</code><code className="cpp plain">delay(10000);&nbsp; </code><code className="cpp comments">//Send a request every 10 seconds</code></div><div className="line number57 index56 alt2">&nbsp;</div><div className="line number58 index57 alt1"><code className="cpp plain">&#125;</code></div></div>

</pre>














</div>





</div>

);



}
export default Docs;