package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[]notAllowedActions={HttpMethod.DELETE,HttpMethod.PUT,HttpMethod.POST};

        configMethod(Product.class,config, notAllowedActions);
        configMethod(ProductCategory.class,config, notAllowedActions);
        configMethod(Country.class,config, notAllowedActions);
        configMethod(State.class,config, notAllowedActions);
    }

    private static void configMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] notAllowedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(notAllowedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(notAllowedActions)));
    }


}
