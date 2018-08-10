package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import entity.Employee;

public class EmployeeDAO {
	public List<Employee> findAll() throws Exception {
		List<Employee> emps = new ArrayList<Employee>();
		Connection conn = null;
		PreparedStatement state = null;
		ResultSet rs = null;
		
		try {
			conn = DBUtil.getConnection();
			state = conn.prepareStatement("SELECT * FROM t_emp");
			rs = state.executeQuery();
			while (rs.next()) {
				Employee emp = new Employee(
						rs.getInt("id"),
						rs.getString("name"),
						rs.getDouble("salary"),
						rs.getInt("age"));
				emps.add(emp);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			DBUtil.close(conn);
		}
		
		return emps;
	}
	
	public void delete(int id) throws Exception {
		Connection conn = null;
		PreparedStatement state = null;
		
		try {
			conn = DBUtil.getConnection();
			state = conn.prepareStatement("DELETE FROM t_emp WHERE id=?");
			state.setInt(1, id);
			state.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			DBUtil.close(conn);
		}
	}
	
	public void save(Employee emp) throws Exception {
		Connection conn = null;
		PreparedStatement state = null;
		
		try {
			conn = DBUtil.getConnection();
			state = conn.prepareStatement("INSERT INTO t_emp VALUES(NULL,?,?,?)");
			state.setString(1, emp.getName());
			state.setDouble(2, emp.getSalary());
			state.setInt(3, emp.getAge());
			state.executeUpdate();	
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			DBUtil.close(conn);
		}
	}
	
	public Employee findById(int id) throws Exception {
		Employee emp = null;
		
		Connection conn = null;
		PreparedStatement state = null;
		ResultSet rs = null;
		try {
			conn = DBUtil.getConnection();
			state = conn.prepareStatement("SELECT * FROM t_emp WHERE id=?");
			state.setInt(1, id);
			rs = state.executeQuery();
			if (rs.next()) {
				emp = new Employee(
						rs.getInt("id"),
						rs.getString("name"),
						rs.getDouble("salary"),
						rs.getInt("age"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			DBUtil.close(conn);
		}
		
		return emp;
	}
	
	public void update(Employee emp) throws Exception {
		Connection conn = null;
		PreparedStatement state = null;
		
		try {
			conn = DBUtil.getConnection();
			state = conn.prepareStatement("UPDATE t_emp SET name=?, salary=?, age=? WHERE id=?");
			state.setString(1, emp.getName());
			state.setDouble(2, emp.getSalary());
			state.setInt(3, emp.getAge());
			state.setInt(4, emp.getId());
			state.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			DBUtil.close(conn);
		}
	}
}
