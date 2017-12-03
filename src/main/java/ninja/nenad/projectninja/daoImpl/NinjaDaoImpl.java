package ninja.nenad.projectninja.daoImpl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ninja.nenad.projectninja.dao.NinjaDao;
import ninja.nenad.projectninja.domain.NinjaDatabase;

@Repository("ninjaDao")
public class NinjaDaoImpl implements NinjaDao {

	private JdbcTemplate jdbcTemplate;
	
//	@Autowired
//	private DataSource dataSource;
	
	@Autowired
	@Override
	public void setDataSource(DataSource ds) {
		jdbcTemplate = new JdbcTemplate(ds);
	}

	@Override
	public boolean create(NinjaDatabase ninja) {
		String sqlQuery = "INSERT INTO ninja_table (name, company, email, message)"
				+ "VALUES (?,?,?,?)";
		Object[] args = new Object[] {ninja.getName(), ninja.getCompany(), ninja.getEmail(), ninja.getMessage()};
		
		return jdbcTemplate.update(sqlQuery, args) == 1;
	}

	@Override
	public NinjaDatabase getNinjaDatabaseObject(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<NinjaDatabase> getAllRecords() {
		String sqlQuery = "SELECT * FROM ninja_table";
		List<NinjaDatabase> ninjaList = jdbcTemplate.query(sqlQuery, new NinjaRowMapper());
		
		return ninjaList;
	}

	@Override
	public boolean delete(NinjaDatabase ninja) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean update(NinjaDatabase ninja) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void cleanup() {
		// TODO Auto-generated method stub

	}

}
