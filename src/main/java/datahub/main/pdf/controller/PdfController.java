package datahub.main.pdf.controller;

import datahub.utils.PropertiesUtil;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.*;

@Controller
public class PdfController {

    @Autowired
    ServletContext context;

    @RequestMapping(value = "EvCharger.mng", method = RequestMethod.POST)
    public void EvChargerReport(HttpServletRequest request, HttpServletResponse response) {
        {
            Connection conn = null;
            try {
                String dbUrl = PropertiesUtil.getProperty("application.db.Url2");
                String dbUserId = PropertiesUtil.getProperty("application.db.UserName2");
                String dbPw = PropertiesUtil.getProperty("application.db.Password2");

                Map<String, Object> parameters = new HashMap<String, Object>();
                String imageString = request.getParameter("capture"); // Image Capture
                String base64Image = imageString.toString().split(",")[1];
                byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
                BufferedImage trafficChartImage = ImageIO.read(new ByteArrayInputStream(imageBytes));

                parameters.put("Capture_Image", trafficChartImage);

                Class.forName("org.postgresql.Driver");
                // JASPER DB CONNECTION
                conn = DriverManager.getConnection(dbUrl, dbUserId, dbPw);
                JasperReport jasperReport = null;
                JasperDesign jasperDesign = null;

                String path = context.getRealPath("/WEB-INF/");
                jasperDesign = JRXmlLoader.load(path + "/report/EvReport.jrxml"); //보고서 생성
                jasperReport = JasperCompileManager.compileReport(jasperDesign); //보고서 컴파일

                //PDF형식으로 변환
                byte[] byteStream = JasperRunManager.runReportToPdf(jasperReport, parameters,new JREmptyDataSource());
                OutputStream outStream = response.getOutputStream();
                response.setContentType("application/pdf");
                response.setContentLength(byteStream.length);

                outStream.write(byteStream, 0, byteStream.length);
                outStream.flush();

            } catch (ClassNotFoundException e) {
                // TODO Auto-generated catch block
                System.out.println("ClassNotFoundException Occured");
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                System.out.println("SQLException Occured");
            } catch (JRException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                System.out.println("JRException Occured");
            } catch (IOException e) {
                System.out.println("IOException Occured");
            }finally {
                if(conn != null){ try { conn.close(); } catch (SQLException e){ System.err.println("SQLException? occured"); }}
            }
        }
    }
}
