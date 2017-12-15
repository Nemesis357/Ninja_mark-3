package model;

import java.util.List;

public class NinjaList {
	
    private List<AjaxResponseBody> ninjas;

    public NinjaList(List<AjaxResponseBody> ninjas) {
		this.ninjas = ninjas;
	}

	public List<AjaxResponseBody> getNinja() {
        return ninjas;
    }

    public void setPersons(List<AjaxResponseBody> ninjas) {
        this.ninjas = ninjas;
    }
	
}
