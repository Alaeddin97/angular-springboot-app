package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager entityManager){
        this.entityManager=entityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[]notAllowedActions={HttpMethod.DELETE,HttpMethod.PUT,HttpMethod.POST};

        configMethod(Product.class,config, notAllowedActions);
        configMethod(ProductCategory.class,config, notAllowedActions);
        configMethod(Country.class,config, notAllowedActions);
        configMethod(State.class,config, notAllowedActions);
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();

        List<Class> entityClasses=new ArrayList<>();

        for(EntityType entityTemp:entities){
            entityClasses.add(entityTemp.getJavaType());
        }

        // expose ids
        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }

    private static void configMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] notAllowedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(notAllowedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(notAllowedActions)));
    }


}
