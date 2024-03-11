package ru.msc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.msc.model.TrackComment;

public interface CommentRepository extends JpaRepository<TrackComment, Integer> {
}
