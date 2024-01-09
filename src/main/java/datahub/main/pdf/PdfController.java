package datahub.main.pdf;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

@Controller
public class PdfController {

    @RequestMapping(value = "pdf.mng", method = RequestMethod.GET)
    public String pdf(Model model) {
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("파이썬");
        list.add("R");
        list.add("C++");
        list.add("자바스크립트");
        list.add("Ruby");
        list.add("스칼라");
        list.add("클로져");
        list.add("자바");

        //뷰에게 전달할 데이터 저장
        model.addAttribute("list",list);

        //출력할 뷰 이름 리턴
        return "pdf";
    }
}
