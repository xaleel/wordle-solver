from http.client import HTTPResponse
from turtle import st
from django.shortcuts import render
from .models import all_words, freq
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def solve(request, guesses):
    gs = list(map(lambda x: tuple(x.split(",")), guesses.split("^")))
    return JsonResponse({"s": wordle(all_words, gs)}, status=200)


def wordle(wordlist, guesses):
    fxd = [0 for i in range(len(list(wordlist)[0]))]     # fixed - exactly in that position
    nt = {x: [] for x in range(len(list(wordlist)[0]))}  # not - definitely not in that position
    pos = []                                             # possible - can be in other positions
    exc = []                                             # excluded - cannot be in any position
    for guess in guesses:  # guess => [letter, result], e.g. ["a", "G"]
        for i, l in enumerate(guess[1]):
            if l == "-" and guess[0][i] not in exc and guess[0][i] not in fxd:
                exc.append(guess[0][i])
            elif l == "G":
                fxd[i] = guess[0][i]
            elif l == "Y":
                nt[i].append(guess[0][i])
                if guess[0][i] not in pos:
                    pos.append(guess[0][i])
    full = list(
        filter(
            lambda x: not False
            in [x.upper()[i] == y or y == 0 for i, y in enumerate(fxd)]
            and not False in [y not in nt[i] for i, y in enumerate(x.upper())]
            and not False in [y in x.upper() for y in pos]
            and not False in [x.upper().count(y) == fxd.count(y) for y in exc],
            wordlist,
        )
    )

    def w_freq(w):  # the lower the w_freq, the higher the frequency.
        if w.lower() in freq.keys():
            return freq[w.lower()]
        else:
            return 99999

    full.sort(key=w_freq)
    return full[:5]
