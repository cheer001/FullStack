package com.spring.datajpa;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author wang.hz
 * @Date 2018/7/4
 * <p>解决springboot打成war包，部署tomcat后访问404问题</p>
 */
public class SpringbootTutorialsTomcatApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SpringbootTutorialsApplication.class);
    }

}