package dao;

import java.sql.Connection;
import java.sql.DriverManager;

import com.mysql.cj.jdbc.MysqlDataSource;

public class DBUtil {
	public static Connection getConnection() throws Exception {
		Connection conn = null;
		MysqlDataSource ds = null;
		
		try {
			ds = new MysqlDataSource();
			ds.setUrl("jdbc:mysql://192.168.56.101:3306/employee");
			ds.setUser("root");
			ds.setPassword("mysqldb");
			conn = ds.getConnection();
//			Class.forName("com.mysql.jdbc.Driver");
//			conn = DriverManager.getConnection("jdbc:mysql://google/employee?cloudSqlInstance=employee-205819:us-east4:mysql&socketFactory=com.google.cloud.sql.mysql.SocketFactory&user=root&password=mysqldb&useSSL=false");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		
		return conn;
	}
	
	
	public static void close(Connection conn) throws Exception {
		if (conn != null) {
			try {
				conn.close();
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}
	}
	
}
