package ninja.nenad.projectninja.daoImpl;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import ninja.nenad.projectninja.domain.NinjaDatabase;

public class NinjaRowMapper implements RowMapper<NinjaDatabase> {

	@Override
	public NinjaDatabase mapRow(ResultSet rs, int rowNum) throws SQLException {
		NinjaDatabase ninja = new NinjaDatabase();
		ninja.setId(rs.getInt("id"));
		ninja.setName(rs.getString("name"));
		ninja.setCompany(rs.getString("company"));
		ninja.setEmail(rs.getString("email"));
		ninja.setMessage(rs.getString("message"));
		
		return ninja;
	}

}
