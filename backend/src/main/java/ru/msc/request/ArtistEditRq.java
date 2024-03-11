package ru.msc.request;

import org.springframework.web.multipart.MultipartFile;

public class ArtistEditRq {

    private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
