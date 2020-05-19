package com.github.mbw.commons.util.upload;

import cn.afterturn.easypoi.excel.ExcelImportUtil;
import cn.afterturn.easypoi.excel.entity.ImportParams;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

/**
 * 文件上传/导入Excel工具类
 *
 * @author Mabowen
 * @date 2020-03-30 19:14
 */
public class UploadFileUtil {

    /**
     * 文件上传
     * @author Mabowen
     * @date 19:19 2020-03-30
     * @param uploadDir 上传文件保存目录
     * @param file 上传的文件
     * @param fileName 自定义/文件名
     * @return 返回文件保存路径
     */
    private String upload(String rootPath, String uploadDir, MultipartFile file, String fileName) throws IOException{
        //文件后缀名
        String suffix = Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf("."));
        //上传文件名
        String filename = fileName + suffix;
        //服务器端保存的文件对象
        File serverFile = new File(rootPath + uploadDir + filename);
        //将上传的文件写入到服务器端文件内
        file.transferTo(serverFile);
        //返回文件保存路径
        return uploadDir + filename;
    }

    /**
     * 导入excel文件
     * @author Mabowen
     * @date 19:27 2020-03-30
     * @param filePath
     * @param titleRows
     * @param headerRows
     * @param pojoClass
     * @return
     */
    public  <T> List<T> importExcel(String filePath, Integer titleRows, Integer headerRows, Class<T> pojoClass){
        if (StringUtils.isBlank(filePath)){
            return null;
        }
        ImportParams params = new ImportParams();
        params.setTitleRows(titleRows);
        params.setHeadRows(headerRows);
        List<T> list = null;
        try {
            list = ExcelImportUtil.importExcel(new File(filePath), pojoClass, params);
        }catch (Exception e) {
            e.printStackTrace();

        }
        return list;
    }

    /**
     * 导入excel文件
     * @author Mabowen
     * @date 19:27 2020-03-30
     * @param file
     * @param titleRows
     * @param headerRows
     * @param pojoClass
     * @return
     */
    public  <T> List<T> importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass){
        if (file == null){
            return null;
        }
        ImportParams params = new ImportParams();
        params.setTitleRows(titleRows);
        params.setHeadRows(headerRows);
        List<T> list = null;
        try {
            list = ExcelImportUtil.importExcel(file.getInputStream(), pojoClass, params);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
