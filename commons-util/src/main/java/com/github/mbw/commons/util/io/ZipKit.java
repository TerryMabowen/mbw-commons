package com.github.mbw.commons.util.io;

import com.github.mbw.commons.lang.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.apache.tools.zip.ZipOutputStream;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;

/**
 * 解压压缩工具包
 *
 * @author Mabowen
 * @date 2020-04-09 18:31
 */
@Slf4j
public class ZipKit {
    private static final byte[] buffer = new byte[2048];

    /**
     * 解压缩
     * @author Mabowen
     * @date 18:32 2020-04-09
     * @param zipFile 要解压的zip文件
     * @param dir 解压后文件存放的目录
     * @return true: 解压缩成功，false：解压缩失败
     */
    @SuppressWarnings("rawtypes")
    public static void extract(File zipFile, String dir) {
        if (zipFile == null) {
            throw new ServiceException("要解压的zip文件不能为空");
        }

        if (StringUtils.isBlank(dir)) {
            throw new ServiceException("解压后文件存放的目录不能为空");
        }

        if (zipFile.getPath().equals(dir)) {
            throw new ServiceException("压缩文件所在的目录不能和解压后文件存放的目录相同");
        }

        File fileDir = new File(dir);
        if (!fileDir.isDirectory()) {
            throw new ServiceException("dir不是一个目录：" + dir);
        }

        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }

        if (zipFile.getName().endsWith(".zip") || zipFile.getName().endsWith(".ZIP")) {
            try {
                ZipFile zip = new ZipFile(zipFile, StandardCharsets.UTF_8.toString());
                Enumeration entries = zip.getEntries();
                while (entries.hasMoreElements()) {
                    ZipEntry zipEntry = (ZipEntry) entries.nextElement();
                    File file = new File(dir + zipEntry.getName());
                    if (file.isDirectory()) {
                        file.mkdirs();
                    } else {
                        File parentFile = file.getParentFile();
                        if (!parentFile.exists()) {
                            parentFile.mkdirs();
                        }
                        InputStream is = zip.getInputStream(zipEntry);
                        OutputStream os = new FileOutputStream(file);
                        int len = 0;
                        while ((len = is.read(buffer)) > 0) {
                            os.write(buffer, 0, len);
                        }
                        is.close();
                        os.flush();
                        os.close();
                    }
                }
            } catch (Exception exp) {
                log.error("解压缩zip文件异常：" + exp.getMessage() + "，文件名：" + zipFile.getName(), exp);
                throw new ServiceException("解压缩zip文件异常：" + exp.getMessage() + "，文件名：" + zipFile.getName(), exp);
            }
        } else {
            throw new ServiceException("被解压的文件不是以.zip或者.ZIP结尾的，传入的压缩文件是：" + zipFile.getName());
        }
    }

    /**
     * 将byte[]写入zip文件，并返回文件的全路径
     * @author Mabowen
     * @date 20:39 2020-04-09
     * @param bytes
     * @param dir
     * @return
     */
    public static String readByte2File(byte[] bytes, String dir, String zipName) {
        if (StringUtils.isBlank(dir)) {
            throw new ServiceException("解压后文件存放的目录不能为空");
        }

        if (StringUtils.isBlank(zipName)) {
            throw new ServiceException("压缩文件名称不能为空");
        }

        File fileDir = new File(dir);
        if (!fileDir.isDirectory()) {
            throw new ServiceException("dir不是一个目录：" + dir);
        }

        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }

        if (zipName.endsWith(".zip") || zipName.endsWith(".ZIP")) {
            try {
                InputStream is = new ByteArrayInputStream(bytes);
                File zip = new File(dir + zipName);
                FileOutputStream fos = new FileOutputStream(zip);

                int len = 0;
                while ((len = is.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }

                fos.close();
                is.close();
                return zip.getPath();
            } catch (Exception exp) {
                log.error("将byte[]写入zip文件异常：" + exp.getMessage(), exp);
                throw new ServiceException("将byte[]写入zip文件异常：" + exp.getMessage(), exp);
            }
        } else {
            throw new ServiceException("zipName必须以.zip或者.ZIP结尾，传入的zipName为：" + zipName);
        }
    }

    /**
     * 压缩
     * @author Mabowen
     * @date 18:33 2020-04-09
     * @param dir 压缩文件保存的目录
     * @param files 需要压缩的文件数组
     * @param zipName 压缩文件名称
     * @return true：压缩成功， false：压缩失败
     */
    public static void compress(String dir, File[] files, String zipName) {
        if (StringUtils.isBlank(dir)) {
            throw new ServiceException("压缩文件保存的目录不能为空");
        }

        if (StringUtils.isBlank(zipName)) {
            throw new ServiceException("压缩文件名称不能为空");
        }

        if (files.length <= 0) {
            throw new ServiceException("需要压缩的文件数组不能为空");
        }

        File fileDir = new File(dir);
        if (!fileDir.isDirectory()) {
            throw new ServiceException("dir不是一个目录：" + dir);
        }

        if (!dir.endsWith(File.separator)) {
            dir = dir + File.separator;
        }

        if (zipName.endsWith(".zip") || zipName.endsWith(".ZIP")) {
            try {
                ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(new File(dir + zipName)));
                zos.setEncoding(StandardCharsets.UTF_8.toString());
                for (File file : files) {
                    InputStream is = new FileInputStream(file);
                    zos.putNextEntry(new ZipEntry(dir + file.getName() + File.separator + file.getName()));
                    int len = 0;
                    while ((len = is.read(buffer)) > 0) {
                        zos.write(buffer, 0, len);
                    }
                    is.close();
                    zos.closeEntry();
                }
                zos.close();
            } catch (Exception exp) {
                log.error("压缩文件异常：" + exp.getMessage(), exp);
                throw new ServiceException("压缩文件异常：" + exp.getMessage(), exp);
            }
        } else {
            throw new ServiceException("zipName必须以.zip或者.ZIP结尾，传入的zipName为：" + zipName);
        }
    }
}
