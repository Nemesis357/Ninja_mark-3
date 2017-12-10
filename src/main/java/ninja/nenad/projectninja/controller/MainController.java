package ninja.nenad.projectninja.controller;

import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import ninja.nenad.projectninja.domain.NinjaDatabase;

@Controller
@RequestMapping("/")
public class MainController {

	
	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public String homeCtrl(Locale locale, Model model) {
		return "redirect:/home";
	}

	@RequestMapping(value = { "/home" }, method = RequestMethod.GET)
	public String homeNewCtrl(Locale locale, Model model) {
		return "home";
	}

	@RequestMapping(value = { "/about" }, method = RequestMethod.GET)
	public String aboutCtrl() {
		return "about";
	}

//	@RequestMapping(value = { "/contact" }, method = RequestMethod.GET)
//	public String contactCtrl() {
//		return "contact";
//	}

	// Form
	@RequestMapping(value = "/contact", method = RequestMethod.GET)
	public ModelAndView contactCtrl() {
		return new ModelAndView("contact", "command", new NinjaDatabase());
	}
}
