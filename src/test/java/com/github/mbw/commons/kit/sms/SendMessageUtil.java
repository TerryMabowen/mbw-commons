package com.github.mbw.commons.kit.sms;

import cn.mbw.oc.common.kit.valid.AssertUtil;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;

/**
 * @author Mabowen
 * @date 2019-12-24 19:39
 */
public class SendMessageUtil {
    private static final String SMS_URL = "http://sms.webchinese.cn/web_api/";

    /**
     * @author Mabowen
     * @date 19:42 2019-12-24
     * @param uid SMS用户id
     * @param key 接口秘钥：SMS登录可查（非登录密码）
     * @param sendPhone 发送目标的手机号
     * @param msg 消息内容
     * @return (返回码：。。。)
     */
    public static Integer sendMessage(String uid, String key, String sendPhone, String msg) {
        AssertUtil.assertNotNull(uid, "SMS用户id不能为空");
        AssertUtil.assertNotNull(key, "接口秘钥不能为空");
        AssertUtil.assertNotNull(sendPhone, "发送目标的手机号不能为空");
        AssertUtil.assertNotNull(msg, "消息内容不能为空");

        HttpClient client = new HttpClient();
        PostMethod post = new PostMethod(SMS_URL);
        // 在头文件中设置转码
        post.addRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=gbk");

        //设置参数
        NameValuePair[] data = {
                new NameValuePair("Uid", uid),
                new NameValuePair("Key", key),
                new NameValuePair("smsMob", sendPhone),
                new NameValuePair("smsText", msg)
        };

        post.setRequestBody(data);

        try {
            client.executeMethod(post);
        } catch (Exception e) {  e.printStackTrace();  }


        Header[] headers = post.getResponseHeaders();
        int statusCode = post.getStatusCode();
        System.out.println("statusCode:" + statusCode);
        for (Header h : headers) {
            System.out.println(h.toString());
        }

        String result ="";
        try {
            result = new String(post.getResponseBodyAsString().getBytes("gbk"));
        } catch (Exception e) {  e.printStackTrace();  }

        post.releaseConnection();

        return Integer.parseInt(result);
    }
}
