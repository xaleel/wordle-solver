"""
Sorts the words by frequency
"""

import csv

with open('all_words.txt', 'r') as words:
    with open('words_sorted.txt', 'a') as txt:
        txt.write('{\n')
        with open('unigram_freq.csv') as f:
            reader = csv.reader(f, delimiter=' ')
            line_count = 0
            all_words = words.readlines()
            for row in reader:
                word = row[0].split(',')[0]
                if len(word) == 5 and word + '\n' in all_words:
                    txt.write(f'    "{word}": {line_count},\n')
                    line_count += 1
                if line_count > 12940:
                    break
        txt.write('}')
print('Done')
