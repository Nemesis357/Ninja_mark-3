package ninja.nenad.projectninja.dao;

import java.util.List;

import javax.sql.DataSource;

import ninja.nenad.projectninja.domain.NinjaDatabase;

public interface NinjaDao {
	
	// Set data-source that will be required to create a connection to the database.
	public void setDataSource(DataSource ds);
	
	// Create a record in the NinjaTabel.
	public boolean create(NinjaDatabase ninja);
	
	// Retrive a single Ninja Record from Ninja Table.
	public NinjaDatabase getNinjaDatabaseObject(Integer id);
	
	// Retrive all Ninja records from the table.
	public List<NinjaDatabase> getAllRecords();
	
	// Delete a specific Ninja record from the table.
	public boolean delete(NinjaDatabase ninja);
	
	// Update an existing Ninja column.
	public boolean update(NinjaDatabase ninja);
	
	public void cleanup();
}
