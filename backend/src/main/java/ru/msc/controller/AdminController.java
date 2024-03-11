package ru.msc.controller;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.msc.request.AdminLoginRq;
import ru.msc.request.ArtistAddRq;
import ru.msc.request.ArtistEditRq;
import ru.msc.request.GetArtistRq;
import ru.msc.service.AdminService;

import java.io.IOException;

import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRq adminLoginRq){
        return adminService.loginAdmin(adminLoginRq);
    }

    @PostMapping("/getArtists")
    public ResponseEntity<?> getArtists(){
        return adminService.getAllArtists();
    }

    @PostMapping("/getArtist")
    public ResponseEntity<?> getArtist(@RequestBody GetArtistRq getArtistRq) {
        return adminService.getArtist(getArtistRq.getArtistId());
    }

    @PostMapping(value = "/editArtist", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> editArtist(@RequestParam("file") MultipartFile file, @RequestParam("id") Integer id) throws IOException {
        return adminService.editArtist(file, id);
    }

    @PostMapping("/getAllTracksByArtist")
    public ResponseEntity<?> getAllTracksByArtist(@RequestParam("artistId") Integer artistId){
        return adminService.getAllTracksByArtist(artistId);
    }

    @PostMapping(value="/addTrack", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> addTrack(@RequestParam("file") MultipartFile file, @RequestParam("title") String title) throws IOException {
        return adminService.addTrack(file, title);
    }

    @PostMapping("/assignArtistToTrack")
    public ResponseEntity<?> assignArtistToTrack(@RequestParam("trackId") Integer trackId, @RequestParam("artistId") Integer artistId) {
        return adminService.assignArtistToTrack(trackId, artistId);
    }

    @PostMapping("/addArtist")
    public ResponseEntity<?> addArtist(@RequestParam("artistName") String artistName) {
        return adminService.addArtist(artistName);
    }

}
