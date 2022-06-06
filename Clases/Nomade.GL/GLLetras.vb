Public Class GLLetras

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarLetra(ByVal p_CODE As String, ByVal p_ESTADO As String, Optional ByVal p_TIPO As String = "", Optional ByVal p_ESTADO_LETRA As String = "",
                                Optional ByVal p_CTLG As String = "", Optional ByVal p_canje As String = "", Optional ByVal p_moneda As String = "",
                                Optional ByVal p_numero As String = "", Optional ByVal p_girador As String = "", Optional ByVal p_fechaIni As String = "",
                                Optional ByVal p_fechaFin As String = "") As DataTable
        Try
            Dim dt As New DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFL_LISTAR_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_LETRA", p_ESTADO_LETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANJE", p_canje, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO", p_numero, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GIRADOR", p_girador, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAINI", p_fechaIni, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAFIN", p_fechaFin, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function ListarLetraVencida(p_ctlg_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_LETRAS_VENCIDAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarLetra(ByVal p_codigo As String, ByVal p_ctlg_code As String,
                                   ByVal p_tipo As String, ByVal p_num_letra As String,
                                   ByVal p_ref_girador As String, ByVal p_lugar_giro As String,
                                   ByVal p_fecha_giro As String, ByVal p_fecha_vcto As String,
                                   ByVal p_monto As String, ByVal p_girador_pidm As String,
                                   ByVal p_giradoa_pidm As String, ByVal p_estado_ind As String,
                                   ByVal p_avalista_pidm As String, ByVal p_banc_code As String, ByVal p_oficina As String, ByVal p_dc As String,
                                   ByVal p_num_cta As String, ByVal p_importe As String, ByVal p_estado As String, ByVal p_usua_id As String, ByVal p_destino As String,
                                   ByVal p_firmante_pidm As String, ByVal p_moneda As String, ByVal p_glosa As String, ByVal p_numero_unico As String,
                                   ByVal p_ind_actualiza As String,
                                   Optional ByVal p_CODE_TEXT As String = "", Optional ByVal p_COMEN_ANULACION As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFL_ACTUALIZAR_LETRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_LETRA", p_num_letra, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_GIRADOR", p_ref_girador, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUGAR_GIRO", p_lugar_giro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_GIRO", p_fecha_giro, ParameterDirection.Input, 253))
            If p_fecha_vcto = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VCTO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VCTO", p_fecha_vcto, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GIRADOR_PIDM", p_girador_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GIRADOA_PIDM", p_giradoa_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AVALISTA_PIDM", p_avalista_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_banc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DC", p_dc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_CTA", p_num_cta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_importe, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIRMANTE_PIDM", p_firmante_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_UNICO", p_numero_unico, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_ACTUALIZA", p_ind_actualiza, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_TEXT", p_CODE_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMEN_ANULACION", p_COMEN_ANULACION, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearLetra(ByVal p_ctlg_code As String, ByVal p_scsl_code As String,
                                   ByVal p_tipo As String, ByVal p_num_letra As String,
                                   ByVal p_ref_girador As String, ByVal p_lugar_giro As String,
                                   ByVal p_fecha_giro As String, ByVal p_fecha_vcto As String,
                                   ByVal p_monto As String, ByVal p_girador_pidm As String,
                                   ByVal p_giradoa_pidm As String, ByVal p_estado_ind As String,
                                   ByVal p_avalista_pidm As String, ByVal p_banc_code As String, ByVal p_oficina As String, ByVal p_dc As String,
                                   ByVal p_num_cta As String, ByVal p_importe As String, ByVal p_estado As String, ByVal p_usua_id As String,
                                   ByVal p_destino As String, ByVal p_firmante_pidm As String,
                                   ByVal p_moneda As String, ByVal p_glosa As String, ByVal p_numero_unico As String,
                                   Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_CREAR_LETRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MSJ_ERROR", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_LETRA", p_num_letra, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REF_GIRADOR", p_ref_girador, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LUGAR_GIRO", p_lugar_giro, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_GIRO", p_fecha_giro, ParameterDirection.Input, 253))
            If p_fecha_vcto = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VCTO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_VCTO", p_fecha_vcto, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_monto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GIRADOR_PIDM", p_girador_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GIRADOA_PIDM", p_giradoa_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AVALISTA_PIDM", p_avalista_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_banc_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_OFICINA", p_oficina, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DC", p_dc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_CTA", p_num_cta, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IMPORTE", p_importe, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", p_usua_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESTINO", p_destino, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FIRMANTE_PIDM", p_firmante_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONEDA", p_moneda, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_glosa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUMERO_UNICO", p_numero_unico, ParameterDirection.Input, 253))


            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If
            Dim sCodigo As String = (cmd.Parameters("@p_CODE").Value).ToString()
            If (sCodigo.Equals("ERROR")) Then
                Dim sMsjError As String = cmd.Parameters("@p_MSJ_ERROR").Value
                Throw New Exception(sMsjError)
            End If

            Return sCodigo

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function fnListarLetraCorto(ByVal p_CODE As String) As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFL_LISTAR_LETRA_CORTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)

            If oDT Is Nothing Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function ListarMoneda(ByVal p_CTLG As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PCS_DEVUELVE_MONEDA_BASE_ALTERNA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)



            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function ListarGiradorLetra(ByVal p_ESTADO As String, ByVal p_CTLG As String, ByVal p_TIPO As String, ByVal p_ESTADO_LETRA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFL_LISTAR_GIRADOR_LETRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_LETRA", p_ESTADO_LETRA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


End Class


