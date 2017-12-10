package ninja.nenad.projectninja.config;

import java.util.List;
import java.util.Locale;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.ui.context.support.ResourceBundleThemeSource;
import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.servlet.theme.CookieThemeResolver;
import org.springframework.web.servlet.theme.ThemeChangeInterceptor;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

@Configuration
@ComponentScan("ninja.nenad.projectninja")
@PropertySource("classpath:properties/ninjaConnection.properties")
@EnableWebMvc
@Import({ SecurityConfig.class })
public class WebMvcConfig implements WebMvcConfigurer {
	@Value("${jdbc.driverClassName}")
	private String DB_DRIVER;
	@Value("${jdbc.url}")
	private String DB_URL;
	@Value("${jdbc.username}")
	private String DB_USERNAME;
	@Value("${jdbc.password}")
	private String DB_PASSWORD;

	@Autowired
	private Environment env;

	// @Bean
	// public static PropertySourcesPlaceholderConfigurer
	// propertySourcesPlaceholderConfigurer() {
	// return new PropertySourcesPlaceholderConfigurer();
	// }

	@Bean
	public JdbcTemplate jdbcTemplate() {
		return new JdbcTemplate(dataSource());
	}

	// DataSource
	@Bean
	public DataSource dataSource() {
		DataSource ds = new DataSource();
		ds.setUsername(DB_USERNAME);
		ds.setPassword(DB_PASSWORD);
		ds.setDriverClassName(DB_DRIVER);
		ds.setUrl(DB_URL);

		// ds.setUsername(env.getProperty("jdbc.username"));
		// ds.setPassword(env.getProperty("jdbc.password"));
		// ds.setDriverClassName(env.getProperty("jdbc.driverClassName"));
		// ds.setUrl(env.getProperty("jdbc.url"));

		return ds;
	}

	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	// @Bean
	// public NinjaDao getNinjaDao() {
	// NinjaDao ninja = new NinjaDaoImpl();
	// ninja.setDataSource(dataSource());
	//
	// return ninja;
	// }

	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:properties/ninja");
		messageSource.setCacheMillis(10);
		return messageSource;
	}

	@Bean(name = "localeResolver")
	public SessionLocaleResolver sessionLocaleResolver() {
		return new SessionLocaleResolver();
	}

	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		return localeChangeInterceptor;
	}

	@Bean
	public CookieLocaleResolver cookieLocaleResolver() {
		CookieLocaleResolver clr = new CookieLocaleResolver();
		Locale defaultLocale = new Locale("en");
		clr.setCookieName("lang");
		clr.setDefaultLocale(defaultLocale);
		return clr;
	}

	@Bean
	public RequestMappingHandlerMapping requestMappingHandlerMapping() {
		RequestMappingHandlerMapping rmhm = new RequestMappingHandlerMapping();
		rmhm.setUseSuffixPatternMatch(true);
		rmhm.setUseTrailingSlashMatch(true);
		rmhm.setInterceptors(new Object[] { localeChangeInterceptor() });
		rmhm.setInterceptors(new Object[] { themeChangeInterceptor() });
		return rmhm;
	}

	// @Bean
	// public TilesViewResolver tilesViewResolver() {
	// TilesViewResolver tilesViewResolver = new TilesViewResolver();
	// tilesViewResolver.setOrder(2);
	// return tilesViewResolver;
	// }

	@Bean
	public UrlBasedViewResolver urlBasedViewResolver() {
		UrlBasedViewResolver resolver = new UrlBasedViewResolver();
		resolver.setPrefix("/WEB-INF/views/pages/");
		resolver.setSuffix(".jsp");
		resolver.setViewClass(JstlView.class);
		// resolver.setViewClass(TilesView.class);
		return resolver;
	}

	@Bean
	public TilesConfigurer tilesConfigurer() {
		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/views/**/tiles.xml" });
		tilesConfigurer.setCheckRefresh(true);
		return tilesConfigurer;
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("home");
	}

	// @Bean
	// public DefaultAnnotationHandlerMapping defaultAnnotationHandlerMapping(){
	// DefaultAnnotationHandlerMapping bean = new DefaultAnnotationHandlerMapping();
	// bean.setUseDefaultSuffixPattern(false);
	// return bean;
	// }

	/**
	 * Configure ViewResolvers to deliver preferred views.
	 */
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		TilesViewResolver viewResolver = new TilesViewResolver();
		registry.viewResolver(viewResolver);
	}

	/**
	 * Configure ResourceHandlers to serve static resources like CSS/ Javascript
	 * etc...
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("/static/");
	}

	// Theme support start
	@Bean
	public ResourceBundleThemeSource themeSource() {
		ResourceBundleThemeSource themeSource = new ResourceBundleThemeSource();
		// themeSource.setDefaultEncoding("UTF-8");
		themeSource.setBasenamePrefix("properties/theme-");
		return themeSource;
	}

	@Bean
	public ThemeChangeInterceptor themeChangeInterceptor() {
		ThemeChangeInterceptor interceptor = new ThemeChangeInterceptor();
		interceptor.setParamName("theme");
		return interceptor;
	}

	@Bean
	public CookieThemeResolver themeResolver() {
		CookieThemeResolver resolver = new CookieThemeResolver();
		resolver.setCookieMaxAge(2400);
		resolver.setCookieName("mythemecookie");
		resolver.setDefaultThemeName("rebelGalaxy");
		// resolver.setCookieName("my-theme-cookie");
		return resolver;
	}

	// Theme support end

	@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configurePathMatch(configurer);
	}

	@Override
	public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configureContentNegotiation(configurer);
	}

	@Override
	public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configureAsyncSupport(configurer);
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configureDefaultServletHandling(configurer);
	}

	@Override
	public void addFormatters(FormatterRegistry registry) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addFormatters(registry);
	}

	// @Override
	// public void addInterceptors(InterceptorRegistry registry) {
	//// registry.addInterceptor(themeChangeInterceptor());
	// }

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addInterceptors(registry);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addCorsMappings(registry);
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addArgumentResolvers(resolvers);
	}

	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.addReturnValueHandlers(handlers);
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configureMessageConverters(converters);
	}

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.extendMessageConverters(converters);
	}

	@Override
	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.configureHandlerExceptionResolvers(resolvers);
	}

	@Override
	public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
		// TODO Auto-generated method stub
		WebMvcConfigurer.super.extendHandlerExceptionResolvers(resolvers);
	}

	@Override
	public Validator getValidator() {
		// TODO Auto-generated method stub
		return WebMvcConfigurer.super.getValidator();
	}

	@Override
	public MessageCodesResolver getMessageCodesResolver() {
		// TODO Auto-generated method stub
		return WebMvcConfigurer.super.getMessageCodesResolver();
	}

}
