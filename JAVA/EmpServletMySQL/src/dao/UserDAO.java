package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dao.DBUtil;

import entity.User;

public class UserDAO {
	public User findByUsername(String username) 
	throws Exception{
		User user = null;
		Connection conn = null;
		PreparedStatement prep = null;
		ResultSet rst = null;
		try {
			conn = DBUtil.getConnection();
			prep = conn.prepareStatement(
					"SELECT * FROM t_user WHERE username=?");
			prep.setString(1, username);
			rst = prep.executeQuery();
			if(rst.next()){
				user = new User();
				user.setUsername(username);
				user.setPwd(rst.getString("pwd"));
				user.setName(rst.getString("name"));
				user.setGender(rst.getString("gender"));
				user.setId(rst.getInt("id"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}finally{
			DBUtil.close(conn);
		}
		return user;
	}
	
	public void save(User user) throws Exception {
		Connection conn = null;
		PreparedStatement stmt = null;
		
		try {
			conn = DBUtil.getConnection();
			stmt = conn.prepareStatement("INSERT INTO t_user VALUES (NULL,?,?,?,?)");
			stmt.setString(1, user.getUsername());
			stmt.setString(2, user.getPwd());
			stmt.setString(3, user.getName());
			stmt.setString(4, user.getGender());
			stmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}finally{
			DBUtil.close(conn);
		}
	}
}
