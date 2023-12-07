use std::fs;

fn read_file(day: &str, part: &str) -> String {
    let file_location = format!("../../input/day{day}-part{part}.txt");
    let contents = fs::read_to_string(file_location)
        .expect("should have been able to read the file");
    return contents; 
}

/*
fn read_real_data() -> String {
    let file_location = format!("../../input.txt");
    let contents = fs::read_to_string(file_location)
        .expect("should have been able to read the file");
    return contents; 

}
*/


fn main() {
    let input_1 = read_file("1", "1");
    let input_2 = read_file("1", "2");
//    println!("input_1: {input_1}");

    let output_1 = part_1(input_1);
    let output_2 = part_2(input_2);
    println!("output_1: {output_1}");
    println!("output_2: {output_2}");

}


fn part_1(input: String) -> String {
    let lines = input.split('\n');
    let mut sum = 0;
    for line in lines {
        if line.is_empty() { continue; };

        let (first, _first_index) = get_first_number(line);
        let (last, _last_index) = get_last_number(line);
        
        if first == -1 { continue };

        let value = format!("{first}{last}").parse::<i32>().unwrap();
        sum += value;
    }
    return sum.to_string();
}

fn part_2(input: String) -> String {
    let lines = input.split('\n');
    for line in lines {
        get_first_string_number(line);
    }    
    return "--".to_string();
}


fn get_first_number(line: &str) -> (i32, i32) {
    let zero = '0' as u32;
    let nine = '9' as u32;

    for (i, c) in line.chars().enumerate() {
        let value = c as u32;

        if value >= zero && value <= nine {
            let val = (value - zero) as i32;
            let index = i as i32;
            return (val, index);
        }
    }
    
    return (-1, -1); 
}

fn get_last_number(line: &str) -> (i32, i32) {
    let zero = '0' as u32;
    let nine = '9' as u32;

    for (i, c) in line.chars().rev().enumerate() {
        let value = c as u32;

        if value >= zero && value <= nine {
            let index = line.len() - i -1;
            return ((value - zero) as i32, index as i32);
        }
    }
    
    return (-1, -1); 
}



fn get_first_string_number(line: &str) -> (i32, i32) {
    let bytes = line.as_bytes();
    let mut i = 0;
    let length = line.len();
    while i < length {
        let current = bytes[i];
                
        i += 1;
    }

    return (-1, -1);
}

#[cfg(test)]
mod part_1_tests {
    use super::*;

    #[test]
    fn get_first_num_can_get_the_number() {
        let input = "he5ll8o";
        let ( value, index ) = get_first_number(input);
        assert_eq!(value, 5);
        assert_eq!(index, 2);
    }

    #[test]
    fn get_first_num_returns_negative_when_not_found() {
        let input = "hello";
        let ( value, index ) = get_first_number(input);
        assert_eq!(value, -1);
        assert_eq!(index, -1);
    }
    
    #[test]
    fn get_last_num_can_get_the_number() {
        let input = "h5el8lo";
        let ( value, index ) = get_last_number(input);
        assert_eq!(value, 8);
        assert_eq!(index, 4);
    }

    #[test]
    fn get_last_num_returns_negative_when_not_found() {
        let input = "hello";
        let ( value, index ) = get_last_number(input);
        assert_eq!(value, -1);
        assert_eq!(index, -1);
    }

    #[test]
    fn get_first_string_number_can_get_a_number() {
        let input = "draethreefduidsa4535eightfdasjk";
        let ( value, index ) = get_first_string_number(input);
        assert_eq!(value, 3);
        assert_eq!(index, 4);
    }

}
