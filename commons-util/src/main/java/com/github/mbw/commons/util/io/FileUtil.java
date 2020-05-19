package com.github.mbw.commons.util.io;

import com.github.mbw.commons.lang.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StreamUtils;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * @author Mabowen
 * @date 2019-11-15 15:04
 */
@Slf4j
public class FileUtil {

    /**
     * 创建文件
     *
     * @author Mabowen
     * @date 15:12 2019-11-19
     */
    private static File createFile(String path, String filename) throws IOException {
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        File file = new File(dir, filename);
        if (!file.exists()) {
            file.createNewFile();
        }
        return file;
    }

    /**
     * 复制文件
     *
     * @author Mabowen
     * @date 14:17 2019-11-19
     * @param source 资源文件，被复制
     * @param targetPath 目标文件地址
     * @param filename 复制后的文件名
     */
    public static void copyFile(File source, String targetPath, String filename) {
        InputStream fis = null;
        OutputStream fos = null;
        try {
            File targetFile = createFile(targetPath, filename);
            fis = new FileInputStream(source);
            fos = new FileOutputStream(targetFile);
            StreamUtils.copy(fis, fos);
        } catch (IOException e) {
            log.error("复制文件异常：" + e.getMessage(), e);
            throw new ServiceException("复制文件异常：" + e.getMessage());
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 获取目录下的文件
     * @author Mabowen
     * @date 2020/02/18 18:14
     * @param path
     * @return {@link File[]}
     */
    public static File[] getFiles(String path) {
        File file = new File(path);
        if (file.exists()) {
            return file.listFiles();
        }
        return null;
    }

    /**
     * 将文件压缩成zip
     * @author Mabowen
     * @date 2020/02/18 17:51
     * @param files
     * @param zipFile
     * @return
     */
    public static void zipFiles(File[] files, File zipFile) {
        byte[] buf = new byte[2048];
        try {
            if (files != null && files.length > 0) {
                ZipOutputStream outputStream = new ZipOutputStream(new FileOutputStream(zipFile));
                for (File file : files) {
                    FileInputStream inputStream = new FileInputStream(file);
                    outputStream.putNextEntry(new ZipEntry(file.getName()));
                    int length;
                    while ((length = inputStream.read(buf)) > 0) {
                        outputStream.write(buf, 0, length);
                    }
                    outputStream.closeEntry();
                    inputStream.close();
                }
                outputStream.close();
            } else {
                throw new IOException("存储excel的临时目录下没有excel文件,无法压缩");
            }
        } catch (IOException exp) {
            log.error("文件压缩失败，失败原因: {}", exp.getMessage(), exp);
            throw new ServiceException("文件压缩失败，失败原因: " + exp.getMessage());
        }
    }

    /**
     * 删除文件夹及文件
     * @author Mabowen
     * @date 2020/02/21 21:42
     * @param dirPath
     * @return {@link boolean}
     */
    public static boolean delDirectoryAndFile(String dirPath) {
        //如果path不以文件分隔符结尾，自动添加文件分隔符
        if (!dirPath.endsWith(File.separator)) {
            dirPath = dirPath + File.separator;
        }
        File dirFile = new File(dirPath);
        //如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        boolean flag = true;
        //删除文件夹下的所有文件(包括子目录)
        File[] files = dirFile.listFiles();
        if (files != null && files.length > 0) {
            for (File file : files) {
                if (file.isFile()) {
                    flag = delFile(file.getAbsolutePath());
                    if (!flag) {
                        break;
                    }
                } else {
                    flag = delDirectoryAndFile(file.getAbsolutePath());
                    if (!flag) {
                        break;
                    }
                }
            }
        }

        if (!flag) {
            return false;
        }

        //删除当前目录
        return dirFile.delete();
    }

    /**
     * 删除文件
     * @author Mabowen
     * @date 2020/02/21 21:42
     * @param filePath
     * @return {@link boolean}
     */
    public static boolean delFile(String filePath) {
        boolean flag = false;
        File file = new File(filePath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }
}
