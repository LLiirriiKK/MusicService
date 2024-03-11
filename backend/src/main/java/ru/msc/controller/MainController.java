package ru.msc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.msc.request.*;
import ru.msc.response.MessageResponse;
import ru.msc.service.ArtistService;
import ru.msc.service.CommentService;
import ru.msc.service.TrackService;
import ru.msc.service.UserService;

@RestController
@RequestMapping("/api")
public class MainController {

    private final UserService userService;

    private final TrackService trackService;

    private final ArtistService artistService;

    private final CommentService commentService;

    @Autowired
    public MainController(UserService userService, TrackService trackService, ArtistService artistService, CommentService commentService) {
        this.userService = userService;
        this.trackService = trackService;
        this.artistService = artistService;
        this.commentService = commentService;
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRq userRegisterRq){
        return userService.registerUser(userRegisterRq);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRq userLoginRq){
        return userService.authUser(userLoginRq);
    }


    @CrossOrigin
    @PostMapping("/addArtist")
    public ResponseEntity<?> addArtist(@RequestBody ArtistAddRq artistAddRq) {
        return artistService.addArtist(artistAddRq);
    }

    @CrossOrigin
    @PostMapping("/addTrack")
    public ResponseEntity<?> addTrack(@RequestBody TrackAddRq trackAddRq) {
        return trackService.addTrack(trackAddRq);
    }

    @CrossOrigin
    @PostMapping("/{trackId}/artists/{artistId}")
    public ResponseEntity<?> assignArtistToTrack(@PathVariable Integer trackId, @PathVariable Integer artistId){
        return trackService.assignArtistToTrack(trackId, artistId);
    }

    @CrossOrigin
    @GetMapping("/getAllTracks")
    public ResponseEntity<?> getAllTracks(){
        return trackService.getAllTracks();
    }

    @CrossOrigin
    @GetMapping("/getAllTracksByArtist/{artistId}")
    public ResponseEntity<?> getAllTracksByArtist(@PathVariable Integer artistId){
        return artistService.getAllTracksByArtist(artistId);
    }

    @CrossOrigin
    @PostMapping("/getTrack")
    public ResponseEntity<?> getTrack(@RequestBody TrackGetRq trackGetRq){
        return trackService.getTrack(trackGetRq.getTrackId());
    }

    @CrossOrigin
    @PostMapping("/postComment")
    public ResponseEntity<?> postComment(@RequestBody CommentRq commentRq){
        return commentService.postComment(commentRq);
    }

    @CrossOrigin
    @PostMapping("/listenTrack")
    public ResponseEntity<?> listenTrack(Integer id){
        return trackService.getTrack(id);
    }


}
