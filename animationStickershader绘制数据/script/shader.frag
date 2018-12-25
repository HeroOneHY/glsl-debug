/*
 ------ preDefined pre attached source ------
 
 #ifdef GL_FRAGMENT_PRECISION_HIGH
 precision highp float;
 #else
 precision mediump float;
 #endif
 
 

 uniform float       iGlobalTime;
 uniform int         iFrame;
 uniform vec3        iChannelResolution[4]; //通道的分辨率

 uniform vec4        iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
 #ifdef USE_STRENGTH
 uniform float       iStrength;
 #endif
 
 
 uniform vec2        iResolution;
 uniform bool        iOneToOne;
 
 varying vec2        v_texCoord;
 
 uniform sampler2D   iChannel0;
 uniform sampler2D   iChannel1;
 uniform sampler2D   iChannel2;
 uniform sampler2D   iChannel3;
 
 vec4 texture(     sampler2D   s, vec2 c)                   { return texture2D(s,c); }
 vec4 texture(     sampler2D   s, vec2 c, float b)          { return texture2D(s,c,b); }
 vec4 texture(     samplerCube s, vec3 c )                  { return textureCube(s,c); }
 vec4 texture(     samplerCube s, vec3 c, float b)          { return textureCube(s,c,b); }
 
 ----------------------------------------------
 */

void ledChar(int,float,float,float,float,out vec4);

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 默认全部设置为黑色
    fragColor = vec4(.1,.1,.1,1);
    
    // 本实例左下角为原点
    ledChar(2, 0.1, 0.6, 0.4, 0.5,fragColor); //n代表数字，xa代表x，xb代表weidth。。。。
  //  fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

