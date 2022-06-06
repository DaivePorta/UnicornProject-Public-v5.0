Public Class CTCuentaContable
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function fnAgregarCuentaContable(sCodEmpresa As String, sCodPlanContable As String, sCuenta As String,
                                        sDescripcion As String, sCodClaseCuenta As String, sCuentaPadre As String,
                                        sFechaIni As String, sFechaFin As String,
                                        sEstado As String, sCentroCosto As String, sDestino As String,
                                        sTipoCambio As String, sCodTipoCambio As String, sCodFlujoEfectivo As String, sCodUsuario As String, sClasificacionCuenta As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", sCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", sCodClaseCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CuentaPadre", sCuentaPadre, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaIni", sFechaIni, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FechaFin", sFechaFin, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CentroCosto", sCentroCosto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Destino", sDestino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoCambio", sTipoCambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ValorTipoCambio", IIf(sCodTipoCambio.Equals(""), Nothing, sCodTipoCambio), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodFlujoEfectivo", IIf(sCodFlujoEfectivo.Equals(""), Nothing, sCodFlujoEfectivo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioCrea", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_clasificacionCuenta", sClasificacionCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Respuesta", String.Empty, ParameterDirection.Output, 253))


            cmd = cn.Ejecuta_parms(cmd)

            Dim respuesta As String = cmd.Parameters("@p_Respuesta").Value

            Return respuesta

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnEditarCuentaContable(sCodEmpresa As String, sCodPlanContable As String, sCuenta As String,
                                       sDescripcion As String, sEstado As String,
                                       sCentroCosto As String, sDestino As String, sTipoCambio As String,
                                       sCodTipoCambio As String, sCodFlujoEfectivo As String, sCodUsuario As String, sClasificacionCuenta As String, sDetalleDestino As String, p_empresa As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_EditarCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", sCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Descripcion", sDescripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", sEstado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CentroCosto", sCentroCosto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Destino", sDestino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TipoCambio", sTipoCambio, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ValorTipoCambio", IIf(sCodTipoCambio.Equals(""), Nothing, sCodTipoCambio), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodFlujoEfectivo", IIf(sCodFlujoEfectivo.Equals(""), Nothing, sCodFlujoEfectivo), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_clasificacionCuenta", sClasificacionCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_detalleDestinoa", sDetalleDestino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_empresa", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Respuesta", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Dim respuesta As String = cmd.Parameters("@p_Respuesta").Value

            Return respuesta
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaCuentasContables(ByVal sCodEmpresa As String, ByVal sCuenta As String, ByVal sCodClaseCuenta As String,
                                            ByVal sCodPlanContable As String, ByVal sEstado As String, ByVal sCodUsuario As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCuentasContables", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodClaseCuenta", IIf(sCodClaseCuenta.Equals(""), Nothing, sCodClaseCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", IIf(sCodPlanContable.Equals(""), Nothing, sCodPlanContable), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuario", IIf(sCodUsuario.Equals(""), Nothing, sCodUsuario), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function fnListaCuentasContablesDestino(ByVal sCodEmpresa As String, ByVal sCuenta As String, ByVal sCodPlanContable As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCuentasContablesDestino", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", IIf(sCodPlanContable.Equals(""), Nothing, sCodPlanContable), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function fnCambiarEstadoCuentaContable(ByVal sCuenta As String, ByVal sCodPlanContable As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CambiarEstadoCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", sCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Dim sEstado As String = cmd.Parameters("@p_Estado").Value

            Return sEstado
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnCambiarUsoEnBalance(ByVal sCuenta As String, ByVal sCodPlanContable As String, ByVal sCodUsuario As String) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_CambiarEstadoUsoBalance", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", sCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodUsuarioModif", sCodUsuario, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Uso", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Dim sUso As String = cmd.Parameters("@p_Uso").Value

            Return sUso
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaCtasContabArbol(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sEstado As String, ByVal sDigitos As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCtasContabArbol", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Digitos", sDigitos, ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaCuentasHoja(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCuenta As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCuentasHoja", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaCtasHojaFiltro(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCuenta As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCtasHojaFiltro", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", sCuenta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListaCuentasDestino(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCuenta As String,
                                          ByVal sCuentaDestino As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListaCuentasDestino", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CuentaDestino", IIf(sCuentaDestino.Equals(""), Nothing, sCuentaDestino), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarCentrosCostoxCuentaContable(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCuenta As String,
                                                        ByVal sCodCentroCostoCab As String, ByVal sCodCentroCostoDet As String, ByVal sEstado As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarCentrosCostoxCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostoCab", IIf(sCodCentroCostoCab.Equals(""), Nothing, sCodCentroCostoCab), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodCentroCostoDet", IIf(sCodCentroCostoDet.Equals(""), Nothing, sCodCentroCostoDet), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Estado", IIf(sEstado.Equals(""), Nothing, sEstado), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarValidacionCuentaContable(ByVal sCodEmpresa As String, ByVal sCodPlanContable As String, ByVal sCuenta As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_ListarValidacionCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodEmpresa", sCodEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CodPlanContable", sCodPlanContable, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cuenta", IIf(sCuenta.Equals(""), Nothing, sCuenta), ParameterDirection.Input, 253))

            Dim oDT As DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class