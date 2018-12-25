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

//float x = v_texCoord.x;
//float y = v_texCoord.y;
//
void ledRectChar(int,float,float,float,float,out vec4);
bool inRect(float,float,float,float);
void showFloat(float,out vec4);

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // 默认全部设置为黑色
    fragColor = vec4(.1,.1,.1,1);
    showFloat(float(iMouse.w),fragColor);
    //  fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

void showFloat(float f,out vec4 fragColor){
    int myNum[20];
    int k = 0;
    int iPart = int(floor(abs(f))); //整数部分
    int fPart = int(fract(abs(f))*100000.0); //小数部分 5位
    float m=0.86; //绘制开始的x坐标
    
    // 初始化数组,全部置为代表黑色清空的12,注意：负数为11，小数点为10
    for(int i=0; i<20; i++){
        myNum[i] = 12;
    }
    
    // 插入小数部分，先绘制小数
    while (fPart>0)
    {
        // 从个位开始, 依次取出个位,十位,百位,千位...的数字值
        myNum[k++]=fPart-((fPart/10)*10);
        fPart=fPart/10;
    }
    
    // 如果是0
    if(f==0.0){myNum[k++] = 0;}
    
    // 插入小数点
    myNum[k++] = 10;
    
    // 插入整数部分
    while (iPart>0)
    {
        myNum[k++]=iPart-((iPart/10)*10);
        iPart=iPart/10;
    }
    
    // 如果是负数,则插入代表负号的11
    if(f<0.0) { myNum[k++]=11;}
    
    // 循环输出数字数组
    for(int i=0; i<20; i++)
    {
        m = m-0.05;
        ledRectChar(myNum[i], m, 0.03, 0.6, 0.15,fragColor);
    }
}

bool inRect(float x1,float x2, float y1, float y2){
    if(v_texCoord.x>x1 && v_texCoord.x<x2 && v_texCoord.y>y1 && v_texCoord.y<y2) {
        return true;
    } else {
        return false;
    }
} //设定了一个矩形区域 x1，x2，y1，y2 判断x，y是否在矩形区域内

void ledRectChar(int n, float xa,float xb, float ya, float yb,out vec4 fragColor){
    float x1 = xa;
    float x2 = xa+xb;
    float y1 = ya;
    float y2 = ya+yb;
    float ox = (x2+x1)/2.0;
    float oy = (y2+y1)/2.0;
    float dx = (x2-x1)/10.0;
    float dy = (y2-y1)/10.0;
    float b = (x2-x1)/20.0;
    int num = n;

    // 设定调试区显示范围
    if(v_texCoord.x >= x1 && v_texCoord.x <= x2 && v_texCoord.y >= y1 && v_texCoord.y <= y2) {
        // 设置调试区背景色为绿色
        fragColor = vec4(0.2,1.0,0.2,1.0);
        // 分别绘制出 LED 形式的数字 1~0 , 用黑色绘制1个或2个矩形,由矩形以外的绿色区域组成字型
        if((num==1 && (inRect(x1,ox-dx,y1,y2) || inRect(ox+dx,x2,y1,y2))) ||
           (num==2 && (inRect(x1,x2-dx,oy+dy/2.0,y2-dy) || inRect(x1+dx,x2,y1+dy,oy-dy/2.0))) ||
           (num==3 && (inRect(x1,x2-dx,oy+dy/2.0,y2-dy) || inRect(x1,x2-dx,y1+dy,oy-dy/2.0))) ||
           (num==4 && (inRect(x1+dx,x2-dx,oy+dy/2.0,y2) || inRect(x1,x2-dx,y1,oy-dy/2.0))) ||
           (num==5 && (inRect(x1+dx,x2,oy+dy/2.0,y2-dy) || inRect(x1,x2-dx,y1+dy,oy-dy/2.0))) ||
           (num==6 && (inRect(x1+dx,x2,oy+dy/2.0,y2-dy) || inRect(x1+dx,x2-dx,y1+dy,oy-dy))) ||
           (num==7 && inRect(x1,x2-dx,y1,y2-dy)) ||
           (num==8 && (inRect(x1+dx,x2-dx,oy+dy/2.0,y2-dy) || inRect(x1+dx,x2-dx,y1+dy,oy-dy/2.0))) ||
           (num==9 && (inRect(x1+dx,x2-dx,oy+dy/2.0,y2-dy) || inRect(x1,x2-dx,y1+dy,oy-dy/2.0))) ||
           (num==0 && inRect(x1+dx,x2-dx,y1+dy,y2-dy))||
           (num==10 && (inRect(x1,x2,oy-dy,y2) || inRect(x1,ox-dx*2.0,y1,oy-dy) || inRect(ox+dx*2.0,x2,y1,oy-dy) )) ||
           (num==11 && (inRect(x1,x2,oy+dy,y2) || inRect(x1,x2,y1,oy-dy))) ||
           (num==12)
           )
        {
            fragColor = vec4(0,0,0,.5);
        }
    }
}
//
//
//
