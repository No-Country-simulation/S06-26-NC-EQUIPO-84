package com.bit.backend.services;

import com.bit.backend.dtos.SaludRequest;
import com.bit.backend.dtos.SaludResponse;

public interface SaludService {
    SaludResponse procesarCheckIn(SaludRequest request);
}
