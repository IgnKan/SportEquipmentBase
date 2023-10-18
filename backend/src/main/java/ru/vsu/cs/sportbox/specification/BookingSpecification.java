package ru.vsu.cs.sportbox.specification;


import javax.persistence.criteria.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import ru.vsu.cs.sportbox.data.dto.BookingFilterDto;
import ru.vsu.cs.sportbox.data.model.Booking;
import ru.vsu.cs.sportbox.data.model.Person;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class BookingSpecification {
    public static Specification<Booking> getBookingByIdAndEmailAndDate(BookingFilterDto bookingFilterDto) {
        return new Specification<Booking>() {
            @Override
            public Predicate toPredicate(Root<Booking> root,
                                         CriteriaQuery<?> query,
                                         CriteriaBuilder criteriaBuilder) {

                List<Predicate> predicates = new ArrayList<>();
                int id = bookingFilterDto.getId();
                String email = bookingFilterDto.getEmail();
                String date = bookingFilterDto.getDate();

                Join<Booking, Person> personJoin = root.join("person", JoinType.LEFT);

                if (id != 0)
                {
                    predicates.add(criteriaBuilder.equal(root.get("id"), id));
                }

                if (StringUtils.isNotBlank(email))
                {
                    predicates.add(criteriaBuilder.equal(personJoin.get("email"), email));
                }
                if (StringUtils.isNotBlank(date))
                {
                    Date bookingDate;
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                    try {
                        bookingDate = format.parse(date);
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }

                    predicates.add(criteriaBuilder.equal(root.<Date>get("date"), bookingDate));

                }

                return predicates.size() <= 0 ? null : criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
