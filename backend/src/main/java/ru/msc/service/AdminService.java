package ru.msc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.msc.model.Artist;
import ru.msc.model.Track;
import ru.msc.repository.ArtistRepository;
import ru.msc.repository.TrackRepository;
import ru.msc.repository.UserRepository;
import ru.msc.request.AdminLoginRq;
import ru.msc.response.AuthResponse;
import ru.msc.response.MessageResponse;
import ru.msc.security.UserDetailsImpl;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final ArtistRepository artistRepository;

    private final TrackRepository trackRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    @Autowired
    public AdminService(UserRepository userRepository, ArtistRepository artistRepository, TrackRepository trackRepository, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.artistRepository = artistRepository;
        this.trackRepository = trackRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    public ResponseEntity<?> loginAdmin(AdminLoginRq adminLoginRq)  throws UsernameNotFoundException {
        if (!userRepository.existsByEmail(adminLoginRq.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid login"));
        }

        if (userRepository.findUserByEmail(adminLoginRq.getEmail()).isPresent() &&
                !(new BCryptPasswordEncoder().matches(adminLoginRq.getPassword(), userRepository.findUserByEmail(adminLoginRq.getEmail()).get().getPassword()))) {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid password"));
        }

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(adminLoginRq.getEmail(), adminLoginRq.getPassword()));
        if (authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return ResponseEntity.ok(new AuthResponse(jwtService.generateToken(adminLoginRq.getEmail()), userDetails.getEmail(), userDetails.getLogin(), "Login success"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid data"));
        }

    }

    public ResponseEntity<?> getAllArtists() {
        return ResponseEntity.ok(artistRepository.findAll());
    }

    public ResponseEntity<?> getArtist(Integer artistId) {
        if(artistRepository.findArtistById(artistId).isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("No artist with this id"));
        }
        return ResponseEntity.ok(artistRepository.findArtistById(artistId));
    }

    public ResponseEntity<?> editArtist(MultipartFile file, Integer id) throws IOException {
        if (file != null) {
            if(artistRepository.findArtistById(id).isPresent()) {
                String currentDir = System.getProperty("user.dir");
                String uploadPath = currentDir + "\\src\\main\\resources\\static\\img\\";
                String targetPath = currentDir + "\\target\\classes\\static\\img\\";
                String uuidFile = UUID.randomUUID().toString();
                String resultFileName = uuidFile + "-" + file.getOriginalFilename();
                file.transferTo(new File(uploadPath + resultFileName).toPath());
                file.transferTo(new File(targetPath + resultFileName).toPath());
                Artist artist =  artistRepository.findArtistById(id).get();
                artist.setImgFilePath(resultFileName);
                artistRepository.save(artist);
            }
            return ResponseEntity.ok(new MessageResponse("No artist with this id"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Fail while uploading a file"));
    }

    public ResponseEntity<?> getAllTracksByArtist(Integer artistId) {
        if(artistRepository.findArtistById(artistId).isPresent()){
            Artist artist = artistRepository.findArtistById(artistId).get();
            Set<Track> trackList = artist.getTrackList();
            return ResponseEntity.ok(trackList);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No artist with this id"));
    }

    public ResponseEntity<?> addTrack(MultipartFile file, String title) throws IOException {
        if (file == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("File is empty"));
        }
        if (title == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Title of track has to be filled"));
        }
        String currentDir = System.getProperty("user.dir");
        String uploadPath = currentDir + "\\src\\main\\resources\\static\\audio\\";
        String targetPath = currentDir + "\\target\\classes\\static\\audio\\";
        String uuidFile = UUID.randomUUID().toString();
        String resultFileName = uuidFile + "-" + file.getOriginalFilename();
        file.transferTo(new File(uploadPath + resultFileName).toPath());
        file.transferTo(new File(targetPath + resultFileName).toPath());
        Track track = new Track();
        track.setTitle(title);
        track.setFilepath(resultFileName);
        track.setReleaseDate(new Date());
        trackRepository.save(track);
        return ResponseEntity.ok(new MessageResponse("Track was successfully saved"));
    }

    public ResponseEntity<?> assignArtistToTrack(Integer trackId, Integer artistId) {
        if (!trackRepository.existsById(trackId)) {
            return ResponseEntity.badRequest().body(new MessageResponse("No track with this id"));
        }
        if (!artistRepository.existsById(artistId)) {
            return ResponseEntity.badRequest().body(new MessageResponse("No artists with this id"));
        }
        if (artistRepository.findArtistById(artistId).isPresent()) {
            if (trackRepository.findTrackById(trackId).isPresent()) {
                Artist artist = artistRepository.findArtistById(artistId).get();
                Track track = trackRepository.findTrackById(trackId).get();
                artist.addTrack(track);
                artistRepository.save(artist);
                track.addArtist(artist);
                trackRepository.save(track);
            }
        }
        return ResponseEntity.ok(new MessageResponse("Track and artists are assigned"));

    }

    public ResponseEntity<?> addArtist(String artistName) {
        if (artistName == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Artist name can't be empty"));
        }
        Artist artist = new Artist();
        artist.setName(artistName);
        artist.setImgFilePath("blank-avatar.png");
        artistRepository.save(artist);
        return ResponseEntity.ok(new MessageResponse("Artist was added"));
    }
}
