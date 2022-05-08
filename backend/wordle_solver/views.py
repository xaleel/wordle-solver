from http.client import HTTPResponse
from turtle import st
from django.shortcuts import render
from .models import all_words, freq
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def solve(request, guesses):
    gs = list(map(lambda x: tuple(x.split(',')), guesses.split('^')))
    return JsonResponse({'s': wordle(all_words, gs)}, status=200)

# [("SPOIL", "G----"), ("STEAD", "GYG--"), ("SEETH", "GYGY-")]
def wordle(wordlist, guesses):
    fxd = [0 for i in range(len(list(wordlist)[0]))]
    nt = {x: [] for x in range(len(list(wordlist)[0]))}
    pos = []
    exc = []
    for g in guesses:
        for i, l in enumerate(g[1]):
            if l == '-' and g[0][i] not in exc and g[0][i] not in fxd: exc.append(g[0][i]) 
            elif l == 'G': fxd[i] = g[0][i]
            elif l == 'Y':
                nt[i].append(g[0][i])
                if g[0][i] not in pos: pos.append(g[0][i])
    full = list(filter(lambda x:    not False in [x.upper()[i] == y or y == 0 for i, y in enumerate(fxd)]
                                and not False in [x.upper().count(y) == fxd.count(y) for y in exc]
                                and not False in [y in x.upper() for y in pos]
                                and not False in [y not in nt[i] for i, y in enumerate(x.upper())], wordlist))
    def w_freq(w):
        if w.lower() in freq.keys(): return freq[w.lower()]
        else: return 99999
    full.sort(key=w_freq)
    return full[:5]


