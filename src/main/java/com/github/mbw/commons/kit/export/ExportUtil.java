package com.github.mbw.commons.kit.export;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import com.github.mbw.commons.constant.ExcelConst;
import com.github.mbw.commons.kit.date.DateKit;
import com.github.mbw.commons.kit.io.FileUtil;
import com.github.mbw.commons.kit.valid.AssertUtil;
import com.github.mbw.commons.throwable.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

/**
 * @author Mabowen
 * @date 2020-01-04 19:25
 */
@Slf4j
public class ExportUtil {

    /**
     * 默认导出excel方法
     *
     * @author Mabowen
     * @date 17:26 2020-01-15
     * @param list
     * @param fileName
     * @param response
     */
    public static void defaultExportExcel(List<Map<String, Object>> list, String fileName, HttpServletResponse response) {
        try {
            Workbook workbook = ExcelExportUtil.exportExcel(list, ExcelType.XSSF);
            if (null != workbook) {
                exportExcel(workbook, fileName, response);
            }
        } catch (Exception e) {
            log.error("导出excel异常：" + e.getMessage(), e);
            throw new ServiceException("导出excel异常：" + e.getMessage(), e);
        }
    }

    /**
     * 导出动态表头的excel表格
     * @author Mabowen
     * @date 2020/02/18 16:07
     * @param params 导出参数
     * @param colList 表头list
     * @param dataList 数据list
     * @param fileName
     * @param response
     * @return
     */
    public static void dynamicTableHeadExportExcel(ExportParams params, List<ExcelExportEntity> colList, List<Map<String, Object>> dataList, String fileName, HttpServletResponse response) {
        try {
            Workbook workbook = ExcelExportUtil.exportExcel(params, colList, dataList);
            if (null != workbook) {
                exportExcel(workbook, fileName, response);
            }
        } catch (Exception e) {
            log.error("导出动态表头excel异常：" + e.getMessage(), e);
            throw new ServiceException("导出动态表头excel异常：" + e.getMessage(), e);
        }
    }

    /**
     * 导出大数据量excel
     * @author Mabowen
     * @date 15:51 2020-04-18
     * @param
     * @return
     */
    public static void exportBigDataExcel(ExportParams params, Class<?> pojoClass, List<?> dataList, String fileName, HttpServletResponse response) {
        try {
            Workbook workbook = ExcelExportUtil.exportBigExcel(params, pojoClass, dataList);
            if (null != workbook) {
                exportExcel(workbook, fileName, response);
            }
        } catch (Exception e) {
            log.error("导出大数据量Excel异常：" + e.getMessage(), e);
            throw new ServiceException("导出大数据量Excel异常：" + e.getMessage(), e);
        }
    }

    /**
     * 导出多个excel并压缩层zip下载
     * @author Mabowen
     * @date 2020/02/18 18:29
     * @param workbooks
     * @param excelNames excel文件名集合
     * @param zipName zip压缩文件名
     * @param response
     * @param rootPath 跟目录
     * @return
     */
    public static void exportExcelToZip(List<Workbook> workbooks, List<String> excelNames, String zipName, HttpServletResponse response, String rootPath) {
        try {
            if (workbooks.isEmpty()) {
                return;
            }
            if (workbooks.size() == 1 && excelNames.size() == 1) {
                exportExcel(workbooks.get(0), excelNames.get(0), response);
            } else {
                String currentTimestamp = DateKit.getCurrentTimestamp();
                String excelPath = rootPath + ExcelConst.EXCEL_PATH + File.separator + currentTimestamp + File.separator;
                String zipPath = rootPath + ExcelConst.ZIP_PATH + File.separator + currentTimestamp + File.separator;

                // 首先将excel导出到临时文件夹下
                File excelDir = new File(excelPath);
                if (!excelDir.exists() && !excelDir.isDirectory()) {
                    excelDir.mkdirs();
                }
                for (int i = 0; i < workbooks.size(); i++) {
                    FileOutputStream out = new FileOutputStream(excelPath + excelNames.get(i) + ExcelConst.XLSX);
                    Workbook workbook = workbooks.get(i);
                    workbook.write(out);
                    out.flush();
                    out.close();
                }

                // 将临时文件夹下的excel压缩成zip
                File zipDir = new File(zipPath);
                if (!zipDir.exists() && !zipDir.isDirectory()) {
                    zipDir.mkdirs();
                }
                File[] files = FileUtil.getFiles(excelPath);
                String zipFilePath = zipPath + zipName + ExcelConst.ZIP;
                File zipFile = new File(zipFilePath);
                //将文件压缩成zip
                FileUtil.zipFiles(files, zipFile);

                // 下载zip
                response.setCharacterEncoding("UTF-8");
                response.setHeader("content-Type", "application/octet-stream");
                response.setContentType("application/zip");
                response.setHeader("Location", zipFile.getName());
                response.setHeader("Content-Disposition", "attachment;filename=" + encodeFileName(zipName) + ExcelConst.ZIP);

                OutputStream outputStream = response.getOutputStream();
                InputStream inputStream = new FileInputStream(zipFilePath);

                byte[] buffer = new byte[2048];
                int i;
                while ((i = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, i);
                }
                outputStream.flush();
                outputStream.close();
                inputStream.close();

                //删除临时文件夹下的excel
                FileUtil.delDirectoryAndFile(excelPath);
                //删除zip目录下的zip文件
                FileUtil.delDirectoryAndFile(zipPath);
            }
        } catch (IOException e) {
            log.error("导出多个excel并压缩层zip下载异常: " + e.getMessage(), e);
            throw new ServiceException("导出多个excel并压缩层zip下载异常: " + e.getMessage(), e);
        }
    }

    /**
     * 导出工作薄excel表格
     *
     * @author Mabowen
     * @date 19:28 2020-01-04
     * @param workbook 工作薄
     * @param fileName excel文件名
     * @param response
     */
    private static void exportExcel(Workbook workbook, String fileName, HttpServletResponse response) {
        response.setCharacterEncoding("UTF-8");
        response.setHeader("content-Type", "application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=" + encodeFileName(fileName) + ExcelConst.XLSX);

        try {
            OutputStream os = response.getOutputStream();
            workbook.write(os);
            os.flush();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
            log.error(String.format("导出" + fileName + "失败, 失败原因: %s", e.getMessage()), e);
            throw new ServiceException(String.format("导出" + fileName + "失败, 失败原因: %s", e.getMessage()), e);
        } finally {
            try {
                workbook.close();
            } catch (IOException ignore) {

            }
        }
    }

    /**
     * 文件名转码
     *
     * @author Mabowen
     * @date 15:16 2020-01-15
     * @param fileName
     * @return
     */
    private static String encodeFileName(String fileName) {
        AssertUtil.assertNotNull(fileName, "转码文件名不能为空");

        try {
            fileName = URLEncoder.encode(fileName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error(String.format("转码失败，失败原因: %s", e.getMessage()), e);
            throw new ServiceException(String.format("转码失败，失败原因: %s", e.getMessage()), e);
        }

        return fileName;
    }
}
