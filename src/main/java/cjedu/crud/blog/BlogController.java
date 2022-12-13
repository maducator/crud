package cjedu.crud.blog;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
class BlogController {
    @Autowired
    BlogRepository repos;

    @GetMapping("blog")
    HashMap<String, Object> index(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rows) {
        if( page < 1 ) {
            page = 1;
        }
        if( page >= 1 ) {
            page = page - 1;
        }
        Page<Blog> result = repos.findAll(PageRequest.of(page, rows));
        var rv = new HashMap<String, Object>();
        rv.put("total", result.getTotalElements());
        rv.put("list", result.getContent());
        return rv;
    }

    @GetMapping("blog/pages")
    Page<Blog> pages(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int rows) {
        if( page < 1 ) {
            page = 1;
        }
        if( page >= 1 ) {
            page = page - 1;
        }
        log.info("page: " + page);
        return repos.findAll(PageRequest.of(page, rows));
    }

    @GetMapping("blog/all")
    List<Blog> all() {
        return repos.findAll();
    }

    @GetMapping("blog/page")
    List<Blog> page() {
        return repos.findAllByTitle("test");
    }

    @GetMapping("blog/findByTitle")
    Page<Blog> findByTitle(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        if( page < 1 ) {
            page = 1;
        }
        if( page >= 1 ) {
            page = page - 1;
        }
        return repos.findByTitle("이걸로 계속 저장하면 되겠네.", PageRequest.of(page,size));
    }

    @GetMapping("blog/findTop2ByTitle")
    List<Blog> findTop2ByTitle() {
        return repos.findTop2ByTitle("이걸로 계속 저장하면 되겠네.");
    }

    @GetMapping("blog/echo")
    Blog echo(Blog blog) {
        return blog;
    }

    @GetMapping("blog/fetch")
    Optional<Blog> fetch(Long id) {
        return repos.findById(id);
    }

    @RequestMapping("blog/save")
    Blog save(Blog blog) {
        return repos.save(blog);
    }

    @GetMapping("blog/delete")
    void delete(Long id) {
        repos.deleteById(id);
    }

}