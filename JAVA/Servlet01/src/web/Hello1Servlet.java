package web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Hello1Servlet extends HttpServlet {
	public void service(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String name = request.getParameter("name");
		out.println("<h1>Hello," + name + "</h1>");
		String[] contacts = request.getParameterValues("contact");
		
		if (contacts != null) {
			out.print("<h1>Contact Info: </h1>");
			for (String info : contacts) {
				out.print("<h1>" + info + "</h1>");
			}
		}
		out.close();
	}
}
