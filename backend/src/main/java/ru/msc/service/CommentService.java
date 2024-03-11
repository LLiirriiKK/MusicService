package ru.msc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.msc.model.Track;
import ru.msc.model.TrackComment;
import ru.msc.repository.CommentRepository;
import ru.msc.repository.TrackRepository;
import ru.msc.request.CommentRq;
import ru.msc.response.MessageResponse;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private  final  TrackRepository trackRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, TrackRepository trackRepository) {
        this.commentRepository = commentRepository;
        this.trackRepository = trackRepository;
    }

    public ResponseEntity<?> postComment(CommentRq commentRq) {
        TrackComment trackComment = new TrackComment();
        trackComment.setCommentText(commentRq.getComment());
        commentRepository.save(trackComment);
        if(trackRepository.findTrackById(commentRq.getTrackId()).isPresent()){
            Track track = trackRepository.findTrackById(commentRq.getTrackId()).get();
            track.addComment(trackComment);
            trackRepository.save(track);
            return ResponseEntity.ok(new MessageResponse("Comment was added"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error while putting the comment"));
    }
}
