package ninja.nenad.projectninja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ninja.nenad.projectninja.dao.NinjaDao;
import ninja.nenad.projectninja.domain.NinjaDatabase;

@Service
public class NinjaService {
	
	@Autowired
	private NinjaDao ninjaDao;
	
	public List<NinjaDatabase> getNinjaList() {
		List<NinjaDatabase> ninjaList = ninjaDao.getAllRecords();
		return ninjaList;
	}
	
	
	
}
