package emp;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.EmployeeDAO;
import dao.UserDAO;
import entity.Employee;
import entity.User;

public class ActionServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		String uri = request.getRequestURI();
		
		String action = uri.substring(uri.lastIndexOf("/") + 1, uri.lastIndexOf("."));
		EmployeeDAO dao = new EmployeeDAO();
		UserDAO userDAO = new UserDAO();
		if (action.equals("list")) {
			try {
				RequestDispatcher rd = 
					request.getRequestDispatcher("listEmp.jsp");
				rd.forward(request, response);
			} catch (Exception e) {
				e.printStackTrace();
				out.println("Server is Busy!");
			}
		} else if (action.equals("add")) {
			String name = request.getParameter("name");
			double salary = Double.parseDouble(request.getParameter("salary"));
			int age = Integer.parseInt(request.getParameter("age"));
			try {
				Employee emp = new Employee();
				emp.setAge(age);
				emp.setName(name);
				emp.setSalary(salary);
				
				dao.save(emp);
				response.sendRedirect("list.do");
			} catch (Exception e) {
				e.printStackTrace();
				out.println("Server is Busy!");
			}
			
		} else if (action.equals("load")) {
			int id = Integer.parseInt(request.getParameter("id"));
			try {
				Employee emp = dao.findById(id);
				request.setAttribute("emp", emp);
				request.getRequestDispatcher("updateEmp.jsp").forward(request, response);
			} catch (Exception e) {
				e.printStackTrace();
				out.println("Server is Busy!");
			}
		} else if("delete".equals(action)){
			int id = Integer.parseInt(request.getParameter("id"));
			try {
				dao.delete(id);
				response.sendRedirect("list.do");
			} catch (Exception e) {
				e.printStackTrace();
				throw new ServletException(e);
			}
		} else if("update".equals(action)){
			String name = request.getParameter("name");
			String salary = request.getParameter("salary");
			String age = request.getParameter("age");
			int id = Integer.parseInt(request.getParameter("id"));
			Employee e = new Employee();
			e.setName(name);
			e.setSalary(Double.parseDouble(salary));
			e.setAge(Integer.parseInt(age));
			e.setId(id);
			try {
				dao.update(e);
				response.sendRedirect("list.do");
			} catch (Exception e1) {
				e1.printStackTrace();
				throw new ServletException(e1);
			}
		} else if ("login".equals(action)){

			String userName = request.getParameter("username");
			String pwd = request.getParameter("pwd");
			
			try {
				User u = userDAO.findByUsername(userName);
				if (u == null || !u.getPwd().equals(pwd)) {
					request.setAttribute("login_error", "User Name or Password is wrong!");
					request.getRequestDispatcher("login.jsp").forward(request, response);
				} else {
					response.sendRedirect("list.do");
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new ServletException(e);
			}
		} else if ("register".equals(action)) {
			String userName = request.getParameter("username");
			String name  = request.getParameter("name");
			String pwd  = request.getParameter("pwd");
			String gender  = request.getParameter("sex");
			try {
				User u = userDAO.findByUsername(userName);
				if (u != null) {
					request.setAttribute("register_error", "User Name already exists.");
					request.getRequestDispatcher("register.jsp").forward(request, response);
				} else {
					u = new User();
					u.setUsername(userName);
					u.setName(name);
					u.setPwd(pwd);
					u.setGender(gender);
					userDAO.save(u);
					response.sendRedirect("login.jsp");
				}
			} catch (Exception e) {
				e.printStackTrace();
				throw new ServletException(e);
			}
			
		}
	}

}
